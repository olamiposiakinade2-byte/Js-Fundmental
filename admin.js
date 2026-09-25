const form = document.querySelector('#adminForm');
const tokenInput = document.querySelector('#adminToken');
const message = document.querySelector('#message');
const payments = document.querySelector('#payments');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    message.textContent = 'Loading...';
    payments.innerHTML = '';

    try {
        const response = await fetch('/api/admin/payments', {
            headers: { 'x-admin-token': tokenInput.value }
        });
        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json')
            ? await response.json()
            : { error: 'Open this page through http://localhost:3000/admin.html' };
        if (!response.ok) throw new Error(data.error || 'Could not load payments.');

        data.payments.forEach(function(payment) {
            const row = document.createElement('tr');
            const values = [
                payment.order_id,
                payment.customer_email,
                `${(payment.amount_kobo / 100).toLocaleString()} ${payment.currency}`,
                payment.provider,
                payment.reference,
                payment.status,
                payment.created_at,
                payment.verified_at || '-'
            ];
            values.forEach(function(value) {
                const cell = document.createElement('td');
                cell.textContent = value;
                row.appendChild(cell);
            });
            payments.appendChild(row);
        });
        message.textContent = `${data.payments.length} payment(s) loaded.`;
    } catch (error) {
        message.textContent = error.message;
        message.className = 'error';
    }
});
