// dashboard.js - JavaScript for Dashboard page

document.addEventListener('DOMContentLoaded', () => {
    const userNameSpan = document.getElementById('userName');
    const logoutBtn = document.getElementById('logoutBtn');
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        userNameSpan.textContent = `${user.firstName} ${user.lastName}`;
    } else {
        window.location.href = 'index.html';
    }

    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('user');
        window.location.href = 'index.html';
    });
});
