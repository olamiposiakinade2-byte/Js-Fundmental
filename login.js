const API_BASE_URL = window.REANXIS_API_BASE_URL || '';
const form = document.querySelector('#authForm');
const tabs = document.querySelectorAll('[data-mode]');
const title = document.querySelector('#title');
const description = document.querySelector('#description');
const submitButton = document.querySelector('#submitButton');
const message = document.querySelector('#message');
let mode = 'login';

function apiUrl(path) {
    return `${API_BASE_URL}${path}`;
}

tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        mode = tab.dataset.mode;
        tabs.forEach(item => item.classList.toggle('active', item === tab));
        const registering = mode === 'register';
        title.textContent = registering ? 'Create your account' : 'Welcome back';
        description.textContent = registering
            ? 'Create an account to keep your Reanxis orders and receipts together.'
            : 'Sign in to keep your orders and payment receipts together.';
        submitButton.textContent = registering ? 'Create account' : 'Sign in';
        document.querySelector('#password').autocomplete = registering ? 'new-password' : 'current-password';
        message.textContent = '';
    });
});

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    message.textContent = '';
    submitButton.disabled = true;

    try {
        const response = await fetch(apiUrl(`/api/auth/${mode}`), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                email: document.querySelector('#email').value.trim(),
                password: document.querySelector('#password').value
            })
        });
        const contentType = response.headers.get('content-type') || '';
        const data = contentType.includes('application/json')
            ? await response.json()
            : { error: 'The customer account server is unavailable.' };
        if (!response.ok) throw new Error(data.error || 'Could not authenticate.');
        window.location.href = '/';
    } catch (error) {
        message.textContent = error.message;
    } finally {
        submitButton.disabled = false;
    }
});
