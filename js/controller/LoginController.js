import UserModel from '../model/UserModel.js';
import LoginView from '../view/LoginView.js';

export default class LoginController {
  constructor() {
    this.userModel = UserModel; 
    this.view = new LoginView();
  }

  async login() {
    this.view.showLoading();
    try {
      const formData = this.view.getFormData(); 
      const token = await this.userModel.login(formData.username, formData.password); 
      localStorage.setItem('token', token); 

      const decoded = parseJwt(token);
      if (decoded && decoded.username) {
        localStorage.setItem('username', decoded.username);
      }

      const response = await fetch('http://localhost:8000/api/protected-route', {
            headers: {
            'Authorization': `Bearer ${token}`
        }
        });

        this.view.showSuccess('Inicio de sesión exitoso. Serás redirigido a la página principal.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);

    } catch (error) {
        console.error('Error en el controlador de inicio de sesión:', error);
   
        let errorMessage;
        if (error.message === 'Wrong username/password') {
            errorMessage = 'Nombre de usuario o contraseña incorrectos.';
        } else if (error.message === 'username and password needed.') {
            errorMessage = 'Se requieren nombre de usuario y contraseña.';
        } else {
            errorMessage = 'Error al iniciar sesión. Por favor, intenta de nuevo.';
        }
        this.view.showError(errorMessage);
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);

    } finally {
        this.view.hideLoading();
    }
  }

  
}

function parseJwt (token) {
    try {
        // Decodificar el payload del token
        const base64Url = token.split('.')[1]; 
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null; 
    }
}

