// main.js - Router for navigating between pages

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.endsWith('register.html')) {
        const script = document.createElement('script');
        script.src = 'scripts/register.js';
        document.body.appendChild(script);
    } else if (path.endsWith('hh_login_page.html')) {
        const script = document.createElement('script');
        script.src = 'scripts/login.js';
        document.body.appendChild(script);
    } else if (path.endsWith('dashboard.html')) {
        const script = document.createElement('script');
        script.src = 'scripts/dashboard.js';
        document.body.appendChild(script);
    }
});
