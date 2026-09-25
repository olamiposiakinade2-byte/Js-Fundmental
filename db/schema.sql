PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS customers (
    id TEXT PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    session_token_hash TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    price_kobo INTEGER NOT NULL CHECK (price_kobo > 0),
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1))
);

CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_id TEXT NOT NULL REFERENCES customers(id),
    customer_email TEXT NOT NULL,
    amount_kobo INTEGER NOT NULL CHECK (amount_kobo > 0),
    currency TEXT NOT NULL DEFAULT 'NGN',
    status TEXT NOT NULL DEFAULT 'PENDING',
    created_at TEXT NOT NULL,
    paid_at TEXT,
    CHECK (status IN ('PENDING', 'PAID', 'FAILED', 'CANCELLED'))
);

CREATE TABLE IF NOT EXISTS order_items (
    order_id TEXT NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_amount_kobo INTEGER NOT NULL CHECK (unit_amount_kobo > 0),
    PRIMARY KEY (order_id, product_id)
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id TEXT NOT NULL UNIQUE REFERENCES orders(id),
    customer_id TEXT NOT NULL REFERENCES customers(id),
    customer_email TEXT NOT NULL,
    amount_kobo INTEGER NOT NULL CHECK (amount_kobo > 0),
    currency TEXT NOT NULL,
    provider TEXT NOT NULL DEFAULT 'paystack',
    reference TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'PENDING',
    provider_response TEXT,
    created_at TEXT NOT NULL,
    verified_at TEXT,
    last_error TEXT,
    CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED'))
);

CREATE TABLE IF NOT EXISTS webhook_events (
    event_id TEXT PRIMARY KEY,
    event_name TEXT NOT NULL,
    reference TEXT,
    payload TEXT NOT NULL,
    received_at TEXT NOT NULL,
    processed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created ON payments(created_at);
