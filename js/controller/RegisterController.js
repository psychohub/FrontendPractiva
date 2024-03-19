import UserModel from '../model/UserModel.js';
import RegisterView from '../view/RegisterView.js';


export default class RegisterController {
  constructor() {
    this.userModel = UserModel;
    this.view = new RegisterView();
  }

  async register() {
    this.view.showLoading();
    try {
        const formData = this.view.getFormData();
        console.log('Form data:', formData);
        await this.userModel.register(formData.username, formData.password);
        this.view.showSuccess('Usuario registrado con éxito. Serás redirigido a la página principal.');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } catch (error) {
        console.error('Error en el controlador de registro:', error);
        this.view.showError(error.message || 'Error al registrar usuario');
        setTimeout(() => {
            window.location.href = 'register.html';
        }, 2000);
    } finally {
        this.view.hideLoading();
    }
}

}
