# Public Reanxis deployment

GitHub Pages hosts the storefront only. The Express API must run on a public HTTPS host for customer payments and the admin dashboard to work.

## Render deployment

1. Create a Render account and choose **New + Web Service**.
2. Select the `RENAXIS-PHARMA-LIMITED` GitHub repository.
3. Render can use `render.yaml`, or set:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add the secret environment variables in Render. Do not commit them to GitHub:
   - `PAYMENT_SECRET_KEY`: Paystack test or live secret
   - `PAYMENT_WEBHOOK_SECRET`: matching Paystack webhook secret
   - `ADMIN_TOKEN`: a long random admin token
   - `COOKIE_SECRET`: a long random cookie secret
5. After Render creates a URL such as `https://reanxis-pharma-api.onrender.com`, set:
   - `PUBLIC_BASE_URL=https://reanxis-pharma-api.onrender.com`
   - `FRONTEND_ORIGIN=https://olamiposiakinade2-byte.github.io`
6. In both `index.html` and `login.html`, replace the empty API setting with the Render URL:

```html
<script>
    window.REANXIS_API_BASE_URL = "https://reanxis-pharma-api.onrender.com";
</script>
```

7. Commit and push that frontend change to GitHub Pages.
8. In Paystack, configure the webhook URL:

`https://reanxis-pharma-api.onrender.com/api/payments/webhook`

## Public URLs after deployment

- Storefront: `https://olamiposiakinade2-byte.github.io/RENAXIS-PHARMA-LIMITED/`
- Admin: `https://reanxis-pharma-api.onrender.com/admin.html`
- Health check: `https://reanxis-pharma-api.onrender.com/api/health`

The admin page must be opened on the API host, not the GitHub Pages host. Render's persistent disk is required because the app stores SQLite orders and payments locally. Use a managed database instead for higher scale.
