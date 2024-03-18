export default class FormView {
    constructor() {
      this.form = document.getElementById('ad-form');
      this.nameInput = document.getElementById('name-input');
      this.descriptionInput = document.getElementById('description-input');
      this.priceInput = document.getElementById('price-input');
      this.loadingIndicator = document.getElementById('loading-indicator');
      this.errorMessage = document.getElementById('error-message');
      this.successMessage = document.getElementById('success-message');
    }
  
    showLoading() {
      this.form.style.display = 'none';
      this.loadingIndicator.style.display = 'block';
      this.errorMessage.style.display = 'none';
      this.successMessage.style.display = 'none';
    }
  
    hideLoading() {
      this.loadingIndicator.style.display = 'none';
    }
  
    showError(message) {
      this.errorMessage.textContent = message;
      this.errorMessage.style.display = 'block';
    }
  
    showSuccess(message) {
      this.successMessage.textContent = message;
      this.successMessage.style.display = 'block';
    }
  
    getFormData() {
      return {
        name: this.nameInput.value,
        description: this.descriptionInput.value,
        price: this.priceInput.value,
      };
    }
  
    clearForm() {
      this.form.reset();
    }
  }