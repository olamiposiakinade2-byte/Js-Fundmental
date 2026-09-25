# CampusBite sandbox payments

This integration uses Paystack TEST mode. The frontend never receives or contains a secret key. It sends product IDs and quantities to the Express backend. The backend reads prices from SQLite, creates the Paystack transaction, and redirects the customer to Paystack checkout.

## Setup

1. Install Node.js 22.5 or newer. Node 22.5+ supplies the built-in `node:sqlite` module used by this backend.
2. Copy `.env.example` to `.env`.
3. Put a Paystack **test** secret key in `PAYMENT_SECRET_KEY` and the same secret in `PAYMENT_WEBHOOK_SECRET` for local webhook testing.
4. Replace `ADMIN_TOKEN` and `COOKIE_SECRET` with long random values.
5. Install dependencies with `npm.cmd install` on PowerShell if the `npm.ps1` execution policy is blocked.
6. Start the server with `npm.cmd start`.
7. Open `http://localhost:3000/`.

The first start creates `data/campusbite.sqlite` and seeds the backend product catalog. The browser's displayed price is informational; the backend recalculates the amount.

## Payment lifecycle

- `POST /api/orders` creates a pending order and payment row, then initializes Paystack.
- The browser redirects to the returned `authorizationUrl`.
- Paystack redirects back with a reference. The browser calls `POST /api/payments/verify`.
- The backend independently calls Paystack's verify API and checks reference, amount, currency, customer email, provider status, and existing payment state.
- `POST /api/payments/webhook` validates the HMAC signature, deduplicates the provider event, calls Paystack verification again, and applies the same idempotent transition.
- Only the backend changes `orders.status` to `PAID`.

The callback page alone never proves payment. A missing or invalid provider response leaves the order non-paid.

## Webhooks

For local testing, expose port 3000 with a tunnel such as ngrok and configure Paystack's webhook URL as:

`https://your-tunnel.example/api/payments/webhook`

Use HTTPS and live credentials only after completing every item in `PAYMENT_TEST_CHECKLIST.md` in a staging environment.

## Admin

Open `http://localhost:3000/admin.html` and supply the `ADMIN_TOKEN`. The page reads the protected `/api/admin/payments` endpoint and displays order ID, customer, amount, currency, provider, reference, status, created time, and verification time.

## Production deployment

- Use a managed private host with Node.js, HTTPS, a persistent encrypted volume for the SQLite database, and secret environment variables.
- Set `NODE_ENV=production`, `PUBLIC_BASE_URL` to the HTTPS site, `PAYMENT_SECRET_KEY` to a Paystack LIVE secret, and a separate strong admin token.
- Configure the live Paystack webhook to the HTTPS endpoint.
- Restrict admin access behind real user authentication/authorization or a private network before exposing it publicly; the token endpoint is a minimal demo admin boundary.
- Back up the database, monitor structured logs, rotate secrets, and never log API keys, full card data, or provider secrets.

This repository is sandbox-ready, but it should not be called production-ready until the provider test checklist passes, real customer authentication is added for the intended deployment, and the production infrastructure controls above are in place.
