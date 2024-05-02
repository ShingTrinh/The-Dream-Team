// register.js - JavaScript for Register page

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const userId = document.getElementById('userId').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const password = document.getElementById('password').value;

        // Prepare data to send to the server
        const userData = {
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            password: password
        };

        try {
            const response = await fetch('http:// /register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }
            window.location.href = 'dashboard.html';
        } catch (error) {
            console.error('Registration error:', error.message);
            alert('Registration failed. Please try again.');
        }
    });
});
