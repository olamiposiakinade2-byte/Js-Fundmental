const path = require('node:path');
const fs = require('node:fs');
const crypto = require('node:crypto');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { DatabaseSync } = require('node:sqlite');
require('dotenv').config();

const app = express();
const port = Number(process.env.PORT || 3000);
const frontendOrigin = process.env.FRONTEND_ORIGIN;
const rootDir = __dirname;
const databasePath = path.resolve(rootDir, process.env.DATABASE_PATH || './data/campusbite.sqlite');
const now = () => new Date().toISOString();
const json = value => JSON.stringify(value ?? null);
const parseJson = value => {
    try {
        return JSON.parse(value);
    } catch {
        return null;
    }
};

fs.mkdirSync(path.dirname(databasePath), { recursive: true });
const db = new DatabaseSync(databasePath);
db.exec('PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL;');
db.exec(fs.readFileSync(path.join(rootDir, 'db', 'schema.sql'), 'utf8'));

const customerColumns = db.prepare('PRAGMA table_info(customers)').all();
if (!customerColumns.some(column => column.name === 'password_hash')) {
    db.exec('ALTER TABLE customers ADD COLUMN password_hash TEXT');
}

function transaction(callback) {
    db.exec('BEGIN IMMEDIATE');
    try {
        const result = callback();
        db.exec('COMMIT');
        return result;
    } catch (error) {
        db.exec('ROLLBACK');
        throw error;
    }
}

const products = [
    [1, 'Paracetamol 500mg', 'Pain Relief', 100, 'Everyday pain and fever relief. Follow the label directions.', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=900&q=80'],
    [2, 'Vitamin C Tablets', 'Vitamins', 200, 'Daily vitamin C supplement for immune support.', 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=900&q=80'],
    [3, 'Hand Sanitizer', 'Personal Care', 300, 'Quick-drying hand sanitizer for on-the-go protection.', 'https://images.unsplash.com/photo-1584483766114-2cea6facdf57?auto=format&fit=crop&w=900&q=80'],
    [4, 'Digital Thermometer', 'Devices', 400, 'Fast, easy-to-read digital temperature checks.', 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=80'],
    [5, 'First Aid Kit', 'First Aid', 500, 'Compact kit for basic cuts, scrapes, and emergencies.', 'https://images.unsplash.com/photo-1603398938378-e54eab446dade?auto=format&fit=crop&w=900&q=80'],
    [6, 'Cough Syrup', 'Cold & Flu', 600, 'Soothing cough relief. Read the label before use.', 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=900&q=80'],
    [7, 'Face Masks', 'Protective Care', 700, 'Comfortable disposable masks for everyday protection.', 'https://images.unsplash.com/photo-1584634731339-252c581abfc5?auto=format&fit=crop&w=900&q=80'],
    [8, 'Antiseptic Cream', 'First Aid', 800, 'Topical antiseptic care for minor skin injuries.', 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80'],
    [9, 'Oral Rehydration Salts', 'Wellness', 900, 'Electrolyte sachets for hydration support.', 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=900&q=80']
];
const insertProduct = db.prepare(`INSERT INTO products
    (id, name, category, price_kobo, description, image) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        category = excluded.category,
        price_kobo = excluded.price_kobo,
        description = excluded.description,
        image = excluded.image`);
const seedProducts = () => transaction(() => products.forEach(product => insertProduct.run(...product)));
seedProducts();

const statements = {
    productList: db.prepare('SELECT id, name, category, price_kobo, description, image FROM products WHERE active = 1 ORDER BY id'),
    productById: db.prepare('SELECT id, name, price_kobo FROM products WHERE id = ? AND active = 1'),
    customerBySession: db.prepare('SELECT id, email FROM customers WHERE session_token_hash = ?'),
    customerByEmail: db.prepare('SELECT id, email FROM customers WHERE email = ?'),
    customerByEmailAuth: db.prepare('SELECT id, email, password_hash FROM customers WHERE email = ?'),
    orderById: db.prepare('SELECT * FROM orders WHERE id = ?'),
    paymentByReference: db.prepare('SELECT * FROM payments WHERE reference = ?'),
    paymentByOrder: db.prepare('SELECT * FROM payments WHERE order_id = ?'),
    customerInsert: db.prepare('INSERT INTO customers (id, email, session_token_hash, created_at) VALUES (?, ?, ?, ?)'),
    customerSessionUpdate: db.prepare('UPDATE customers SET session_token_hash = ? WHERE id = ?'),
    customerPasswordUpdate: db.prepare('UPDATE customers SET password_hash = ?, session_token_hash = ? WHERE id = ?'),
    orderInsert: db.prepare('INSERT INTO orders (id, customer_id, customer_email, amount_kobo, currency, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)'),
    itemInsert: db.prepare('INSERT INTO order_items (order_id, product_id, quantity, unit_amount_kobo) VALUES (?, ?, ?, ?)'),
    paymentInsert: db.prepare(`INSERT INTO payments
        (order_id, customer_id, customer_email, amount_kobo, currency, provider, reference, status, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)`),
    markPaymentFailed: db.prepare('UPDATE payments SET status = ?, last_error = ?, provider_response = ? WHERE reference = ? AND status = ?'),
    orderStatus: db.prepare('UPDATE orders SET status = ? WHERE id = ? AND status = ?'),
    paymentSuccess: db.prepare(`UPDATE payments SET status = 'SUCCESS', provider_response = ?, verified_at = ?, last_error = NULL
        WHERE reference = ? AND status = 'PENDING'`),
    paidOrder: db.prepare("UPDATE orders SET status = 'PAID', paid_at = ? WHERE id = ? AND status = 'PENDING'"),
    paymentStatus: db.prepare('SELECT status, verified_at FROM payments WHERE reference = ?'),
    webhookInsert: db.prepare(`INSERT INTO webhook_events
        (event_id, event_name, reference, payload, received_at) VALUES (?, ?, ?, ?, ?)`),
    webhookById: db.prepare('SELECT * FROM webhook_events WHERE event_id = ?'),
    webhookProcessed: db.prepare('UPDATE webhook_events SET processed_at = ? WHERE event_id = ?'),
    adminPayments: db.prepare(`SELECT o.id AS order_id, o.customer_email, p.amount_kobo, p.currency,
        p.provider, p.reference, p.status, o.created_at, p.verified_at
        FROM payments p JOIN orders o ON o.id = p.order_id ORDER BY o.created_at DESC`)
};

app.use((req, res, next) => {
    if (frontendOrigin && req.headers.origin === frontendOrigin) {
        res.setHeader('Access-Control-Allow-Origin', frontendOrigin);
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-token');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    }
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

function log(event, details = {}) {
    console.log(JSON.stringify({ timestamp: now(), event, ...details }));
}

function safeEqual(left, right) {
    const leftBuffer = Buffer.from(String(left || ''));
    const rightBuffer = Buffer.from(String(right || ''));
    return leftBuffer.length === rightBuffer.length && crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
    if (!storedHash || !storedHash.includes(':')) return false;
    const [salt, expectedHash] = storedHash.split(':');
    const actualHash = crypto.scryptSync(password, salt, 64).toString('hex');
    return safeEqual(actualHash, expectedHash);
}

function createId(prefix) {
    return `${prefix}_${crypto.randomUUID()}`;
}

function requireConfig(name) {
    if (!process.env[name]) {
        const error = new Error(`${name} is not configured`);
        error.code = 'CONFIGURATION_ERROR';
        throw error;
    }
    return process.env[name];
}

function getCustomer(req, res) {
    const token = req.cookies.customer_session;
    if (!token) return null;
    const customer = statements.customerBySession.get(hashToken(token));
    if (customer) return customer;
    res.clearCookie('customer_session');
    return null;
}

function setCustomerCookie(res, sessionToken) {
    res.cookie('customer_session', sessionToken, {
        httpOnly: true,
        sameSite: frontendOrigin ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production' || Boolean(frontendOrigin),
        maxAge: 1000 * 60 * 60 * 24 * 30
    });
}

function normalizeItems(items) {
    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
        const error = new Error('At least one item is required');
        error.statusCode = 400;
        throw error;
    }
    const quantities = new Map();
    for (const item of items) {
        const productId = Number(item.productId);
        const quantity = Number(item.quantity);
        if (!Number.isInteger(productId) || !Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
            const error = new Error('Invalid product or quantity');
            error.statusCode = 400;
            throw error;
        }
        quantities.set(productId, (quantities.get(productId) || 0) + quantity);
    }
    const pricedItems = [];
    let total = 0;
    for (const [productId, quantity] of quantities) {
        const product = statements.productById.get(productId);
        if (!product) {
            const error = new Error(`Product ${productId} is unavailable`);
            error.statusCode = 400;
            throw error;
        }
        total += product.price_kobo * quantity;
        pricedItems.push({ productId, quantity, unitAmountKobo: product.price_kobo });
    }
    return { pricedItems, total };
}

async function paystackRequest(endpoint, options = {}) {
    const secretKey = requireConfig('PAYMENT_SECRET_KEY');
    const response = await fetch(`https://api.paystack.co${endpoint}`, {
        ...options,
        headers: {
            Authorization: `Bearer ${secretKey}`,
            'Content-Type': 'application/json',
            ...(options.headers || {})
        }
    });
    const body = await response.json().catch(() => null);
    if (!response.ok || !body?.status) {
        const error = new Error(body?.message || `Payment provider returned HTTP ${response.status}`);
        error.statusCode = response.status >= 500 ? 502 : 400;
        error.providerResponse = body;
        throw error;
    }
    return body.data;
}

function providerResponseForLog(data) {
    return {
        id: data?.id,
        status: data?.status,
        reference: data?.reference,
        amount: data?.amount,
        currency: data?.currency,
        customerEmail: data?.customer?.email,
        gatewayResponse: data?.gateway_response
    };
}

function transitionFromProvider(reference, providerData) {
    const payment = statements.paymentByReference.get(reference);
    if (!payment) {
        const error = new Error('Payment reference was not created by this server');
        error.statusCode = 400;
        throw error;
    }
    if (payment.status === 'SUCCESS') {
        return { status: 'SUCCESS', alreadyProcessed: true, orderId: payment.order_id };
    }
    if (providerData.reference !== payment.reference) {
        const error = new Error('Payment reference mismatch');
        error.statusCode = 400;
        throw error;
    }
    if (Number(providerData.amount) !== payment.amount_kobo) {
        statements.markPaymentFailed.run('FAILED', 'Provider amount mismatch', json(providerResponseForLog(providerData)), reference, 'PENDING');
        statements.orderStatus.run('FAILED', payment.order_id, 'PENDING');
        throw Object.assign(new Error('Payment amount mismatch'), { statusCode: 400 });
    }
    if (String(providerData.currency).toUpperCase() !== payment.currency.toUpperCase()) {
        statements.markPaymentFailed.run('FAILED', 'Provider currency mismatch', json(providerResponseForLog(providerData)), reference, 'PENDING');
        statements.orderStatus.run('FAILED', payment.order_id, 'PENDING');
        throw Object.assign(new Error('Payment currency mismatch'), { statusCode: 400 });
    }
    if (String(providerData.customer?.email || '').toLowerCase() !== payment.customer_email.toLowerCase()) {
        statements.markPaymentFailed.run('FAILED', 'Provider customer mismatch', json(providerResponseForLog(providerData)), reference, 'PENDING');
        statements.orderStatus.run('FAILED', payment.order_id, 'PENDING');
        throw Object.assign(new Error('Payment customer mismatch'), { statusCode: 400 });
    }
    if (providerData.status !== 'success') {
        const status = providerData.status === 'abandoned' ? 'CANCELLED' : 'FAILED';
        statements.markPaymentFailed.run(status, `Provider status: ${providerData.status}`, json(providerResponseForLog(providerData)), reference, 'PENDING');
        statements.orderStatus.run(status, payment.order_id, 'PENDING');
        return { status, orderId: payment.order_id };
    }

    const markPaid = () => transaction(() => {
        const current = statements.paymentByReference.get(reference);
        if (!current || current.status === 'SUCCESS') return false;
        statements.paymentSuccess.run(json(providerResponseForLog(providerData)), now(), reference);
        statements.paidOrder.run(now(), current.order_id);
        return true;
    });
    const changed = markPaid();
    log('payment_verified_success', { orderId: payment.order_id, reference, changed });
    return { status: 'SUCCESS', alreadyProcessed: !changed, orderId: payment.order_id };
}

async function verifyWithProvider(reference) {
    log('payment_verification_started', { reference });
    return paystackRequest(`/transaction/verify/${encodeURIComponent(reference)}`);
}

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('combined'));
app.use(cookieParser());
app.use(express.json({
    verify: (req, res, buffer) => {
        req.rawBody = buffer.toString('utf8');
    }
}));

app.get('/api/health', (req, res) => res.json({ ok: true, environment: process.env.NODE_ENV || 'development' }));
app.get('/api/products', (req, res) => res.json({ products: statements.productList.all() }));

app.post('/api/auth/register', (req, res, next) => {
    try {
        const email = String(req.body?.email || '').trim().toLowerCase();
        const password = String(req.body?.password || '');
        if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
            return res.status(400).json({ error: 'Use a valid email and a password with at least 8 characters' });
        }
        const existing = statements.customerByEmailAuth.get(email);
        if (existing?.password_hash) return res.status(409).json({ error: 'An account already exists for this email' });
        const customerId = existing?.id || createId('cus');
        const sessionToken = crypto.randomBytes(32).toString('hex');
        const saveAccount = () => transaction(() => {
            if (!existing) statements.customerInsert.run(customerId, email, hashToken(sessionToken), now());
            statements.customerPasswordUpdate.run(hashPassword(password), hashToken(sessionToken), customerId);
        });
        saveAccount();
        setCustomerCookie(res, sessionToken);
        return res.status(201).json({ customer: { id: customerId, email } });
    } catch (error) {
        next(error);
    }
});

app.post('/api/auth/login', (req, res, next) => {
    try {
        const email = String(req.body?.email || '').trim().toLowerCase();
        const password = String(req.body?.password || '');
        const customer = statements.customerByEmailAuth.get(email);
        if (!customer || !verifyPassword(password, customer.password_hash)) {
            return res.status(401).json({ error: 'Incorrect email or password' });
        }
        const sessionToken = crypto.randomBytes(32).toString('hex');
        statements.customerSessionUpdate.run(hashToken(sessionToken), customer.id);
        setCustomerCookie(res, sessionToken);
        return res.json({ customer: { id: customer.id, email: customer.email } });
    } catch (error) {
        next(error);
    }
});

app.get('/api/auth/me', (req, res) => {
    const customer = getCustomer(req, res);
    return res.json({ customer });
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('customer_session');
    return res.json({ ok: true });
});

app.post('/api/orders', async (req, res, next) => {
    try {
        const email = String(req.body?.customerEmail || '').trim().toLowerCase();
        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'A valid customer email is required' });
        }
        const { pricedItems, total } = normalizeItems(req.body?.items);
        const sessionCustomer = getCustomer(req, res);
        const emailCustomer = statements.customerByEmail.get(email);
        const existingCustomer =
            sessionCustomer && sessionCustomer.email === email
                ? sessionCustomer
            : emailCustomer || null;
        const customerId = existingCustomer?.id || createId('cus');
        const sessionToken = crypto.randomBytes(32).toString('hex');
        const orderId = createId('ord');
        const reference = createId('campusbite');
        const createdAt = now();
        const createRecords = () => transaction(() => {
            if (!existingCustomer) {
                statements.customerInsert.run(customerId, email, hashToken(sessionToken), createdAt);
            } else if (!sessionCustomer || sessionCustomer.id !== existingCustomer.id) {
                statements.customerSessionUpdate.run(hashToken(sessionToken), existingCustomer.id);
            }
            statements.orderInsert.run(orderId, customerId, email, total, 'NGN', 'PENDING', createdAt);
            for (const item of pricedItems) {
                statements.itemInsert.run(orderId, item.productId, item.quantity, item.unitAmountKobo);
            }
            statements.paymentInsert.run(orderId, customerId, email, total, 'NGN', 'paystack', reference, createdAt);
        });
        createRecords();
        res.cookie('customer_session', sessionToken, {
            httpOnly: true,
            sameSite: frontendOrigin ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production' || Boolean(frontendOrigin),
            maxAge: 1000 * 60 * 60 * 24 * 30
        });
        log('payment_initialization_started', { orderId, reference, amountKobo: total });
        try {
            const transaction = await paystackRequest('/transaction/initialize', {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    amount: total,
                    currency: 'NGN',
                    reference,
                    metadata: {
                        orderId,
                        paymentMethod: String(req.body?.paymentMethod || 'provider_checkout')
                    },
                    callback_url: `${frontendOrigin || process.env.PUBLIC_BASE_URL || `http://localhost:${port}`}/`
                })
            });
            return res.status(201).json({ orderId, reference, authorizationUrl: transaction.authorization_url, status: 'PENDING' });
        } catch (error) {
            statements.markPaymentFailed.run('FAILED', error.message, json(error.providerResponse), reference, 'PENDING');
            statements.orderStatus.run('FAILED', orderId, 'PENDING');
            log('payment_initialization_failed', { orderId, reference, error: error.message });
            throw error;
        }
    } catch (error) {
        next(error);
    }
});

app.post('/api/payments/verify', async (req, res, next) => {
    try {
        const reference = String(req.body?.reference || '').trim();
        if (!reference) return res.status(400).json({ error: 'Payment reference is required' });
        const payment = statements.paymentByReference.get(reference);
        const customer = getCustomer(req, res);
        if (!payment || !customer || customer.id !== payment.customer_id) {
            return res.status(403).json({ error: 'Payment does not belong to this customer' });
        }
        if (payment.status === 'SUCCESS') {
            return res.json({ status: 'SUCCESS', orderId: payment.order_id, verifiedAt: statements.paymentStatus.get(reference).verified_at });
        }
        const providerData = await verifyWithProvider(reference);
        const result = transitionFromProvider(reference, providerData);
        return res.status(result.status === 'SUCCESS' ? 200 : 202).json({ ...result, reference });
    } catch (error) {
        log('payment_verification_failed', { reference: req.body?.reference, error: error.message });
        next(error);
    }
});

app.post('/api/payments/webhook', async (req, res, next) => {
    try {
        const secret = requireConfig('PAYMENT_WEBHOOK_SECRET');
        const signature = req.get('x-paystack-signature');
        const expected = crypto.createHmac('sha512', secret).update(req.rawBody || '').digest('hex');
        if (!safeEqual(signature, expected)) {
            log('webhook_invalid_signature');
            return res.status(401).json({ error: 'Invalid webhook signature' });
        }
        const event = req.body;
        const eventId = String(event?.data?.id || `${event?.event}:${event?.data?.reference || crypto.randomUUID()}`);
        const reference = event?.data?.reference ? String(event.data.reference) : null;
        const existingEvent = statements.webhookById.get(eventId);
        if (existingEvent?.processed_at) {
            log('webhook_duplicate', { eventId, reference });
            return res.json({ received: true, duplicate: true });
        }
        if (!existingEvent) {
            statements.webhookInsert.run(eventId, String(event.event || 'unknown'), reference, req.rawBody || '{}', now());
        }
        log('webhook_received', { event: event.event, eventId, reference });
        if (reference && ['charge.success', 'charge.failed'].includes(event.event)) {
            try {
                const providerData = await verifyWithProvider(reference);
                transitionFromProvider(reference, providerData);
            } catch (error) {
                log('webhook_processing_failed', { eventId, reference, error: error.message });
                if (!error.statusCode || error.statusCode >= 500) {
                    return res.status(502).json({ error: 'Webhook processing will be retried' });
                }
            }
        }
        statements.webhookProcessed.run(now(), eventId);
        return res.json({ received: true });
    } catch (error) {
        next(error);
    }
});

app.get('/api/admin/payments', (req, res) => {
    const expected = process.env.ADMIN_TOKEN;
    if (!expected || !safeEqual(req.get('x-admin-token'), expected)) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    return res.json({ payments: statements.adminPayments.all() });
});

app.use(express.static(rootDir, { index: 'index.html' }));

app.use((error, req, res, next) => {
    const statusCode = error.statusCode || (error.code === 'CONFIGURATION_ERROR' ? 503 : 500);
    log('request_error', { method: req.method, path: req.path, statusCode, error: error.message });
    res.status(statusCode).json({ error: statusCode >= 500 ? 'Payment service temporarily unavailable' : error.message });
});

if (require.main === module) {
    app.listen(port, () => log('server_started', { port, environment: process.env.NODE_ENV || 'development' }));
}

module.exports = { app, db, transitionFromProvider };
