
document.addEventListener('DOMContentLoaded', () => {
    const navElement = document.getElementById('navbar');
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            navElement.innerHTML = data;
            updateNavbar();
        });
});


function updateNavbar() {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username'); 

    if (token) {
       
        document.getElementById('login-nav').style.display = 'none';
        document.getElementById('register-nav').style.display = 'none';
        document.getElementById('user-info').style.display = '';
        document.getElementById('username').textContent = username || 'Usuario'; 
        document.getElementById('logout-nav').style.display = '';
    } else {
        
        document.getElementById('login-nav').style.display = '';
        document.getElementById('register-nav').style.display = '';
        document.getElementById('user-info').style.display = 'none';
        document.getElementById('logout-nav').style.display = 'none';
    }
}


function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = 'login.html';
}
window.logout = logout;
