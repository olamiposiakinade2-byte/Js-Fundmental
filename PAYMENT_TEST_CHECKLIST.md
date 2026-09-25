# Payment test checklist

Run these in Paystack TEST mode with the test credentials and test cards. Do not use live credentials locally.

- [ ] Successful payment: initialize from `POST /api/orders`, complete sandbox checkout, verify `POST /api/payments/verify`, confirm order becomes `PAID` only after provider verification.
- [ ] Failed payment: provider reports failed; confirm payment and order become `FAILED` and no success message is shown.
- [ ] Cancelled payment: abandon checkout; confirm the order is not `PAID` and the UI says payment is pending or cancelled.
- [ ] Duplicate webhook: replay the same signed webhook; confirm the second request returns `duplicate: true` and does not change balances/status twice.
- [ ] Wrong amount: mock/provider response amount differs from the stored order amount; confirm verification rejects and marks the payment `FAILED`.
- [ ] Invalid reference: submit an unknown reference; confirm the server rejects it and does not create or update an order.
- [ ] Pending payment: provider returns a non-success status; confirm the order remains non-paid and the frontend does not show payment success.
- [ ] Invalid signature: send a webhook with a wrong `x-paystack-signature`; confirm HTTP 401 and no database change.
- [ ] Already-paid order: repeat verification/webhook after success; confirm an idempotent success response and no duplicate transition.
- [ ] Customer ownership: attempt to verify another customer's reference without their session cookie; confirm HTTP 403.
- [ ] Admin authorization: request `/api/admin/payments` without `x-admin-token`; confirm HTTP 401.
