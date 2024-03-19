export default class RegisterView {
    constructor() {
      this.form = document.getElementById('register-form');
      this.usernameInput = document.getElementById('username-input');
      this.passwordInput = document.getElementById('password-input');
      this.loadingIndicator = document.getElementById('loading-indicator');
      this.errorMessage = document.getElementById('error-message');
      this.successMessage = document.getElementById('success-message');
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
        console.log('Mostrando mensaje de error:', message);
        this.form.style.display = 'block';
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
        this.errorMessage.style.display = 'none';
        this.successMessage.style.display = 'none';
      }
    
    showSuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
      }
  }