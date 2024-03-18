import UserModel from '../model/UserModel.js';
import LoginView from '../view/LoginView.js';

export default class LoginController {
  constructor() {
    this.model = new UserModel();
    this.view = new LoginView();
  }

  async login() {
    this.view.showLoading();
    try {
      const formData = this.view.getFormData();
      await this.model.login(formData.username, formData.password);
      this.view.clearForm();
      window.location.href = 'index.html';
    } catch (error) {
      this.view.showError('Error al iniciar sesión');
    } finally {
      this.view.hideLoading();
    }
  }
}