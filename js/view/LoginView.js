export default class LoginView {
    constructor() {
      this.form = document.getElementById('login-form');
      this.usernameInput = document.getElementById('username-input');
      this.passwordInput = document.getElementById('password-input');
      this.loadingIndicator = document.getElementById('loading-indicator');
      this.errorMessage = document.getElementById('error-message');
    }
  
    showLoading() {
      this.form.style.display = 'none';
      this.loadingIndicator.style.display = 'block';
      this.errorMessage.style.display = 'none';
    }
  
    hideLoading() {
      this.loadingIndicator.style.display = 'none';
    }
  
    showError(message) {
      this.errorMessage.textContent = message;
      this.errorMessage.style.display = 'block';
    }
  
    getFormData() {
      return {
        username: this.usernameInput.value,
        password: this.passwordInput.value,
      };
    }
  
    clearForm() {
      this.form.reset();
    }
  }