// login.js - JavaScript for Login page

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userId = document.getElementById('userId').value;
        const password = document.getElementById('password').value;

        const userData = {
            userId: userId,
            password: password
        };

        try {
            const response = await fetch('', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }
            const user = await response.json();

            sessionStorage.setItem('user', JSON.stringify(user));

            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Login error:', error.message);
            alert('Login failed. Please check your credentials.');
        }
    });
});
