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
      this.view.showError(error.message); 
    } finally {
      this.view.hideLoading(); 
    }
  }
}
