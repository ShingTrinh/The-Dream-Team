// main.js - Router for navigating between pages

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('register.html')) {
        const script = document.createElement('script');
        script.src = 'js/register.js';
        document.body.appendChild(script);
    } else if (path.endsWith('login.html')) {
        const script = document.createElement('script');
        script.src = 'js/login.js';
        document.body.appendChild(script);
    } else if (path.endsWith('dashboard.html')) {
        const script = document.createElement('script');
        script.src = 'js/dashboard.js';
        document.body.appendChild(script);
    }
});
