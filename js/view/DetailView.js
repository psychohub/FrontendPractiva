export default class DetailView {
    constructor() {
      this.detailContainer = document.getElementById('detail-container');
      this.loadingIndicator = document.getElementById('loading-indicator');
      this.errorMessage = document.getElementById('error-message');
    }
  
    showLoading() {
      this.detailContainer.style.display = 'none';
      this.loadingIndicator.style.display = 'block';
      this.errorMessage.style.display = 'none';
    }
  
    hideLoading() {
      this.loadingIndicator.style.display = 'none';
    }
  
    showError(message) {
      this.detailContainer.style.display = 'none';
      this.errorMessage.textContent = message;
      this.errorMessage.style.display = 'block';
    }
  
    renderAd(ad) {
      this.detailContainer.innerHTML = `
        <h2>${ad.name}</h2>
        <p>${ad.description}</p>
        <p>Precio: ${ad.price}</p>
        <button id="delete-btn">Eliminar</button>
      `;
      this.detailContainer.style.display = 'block';
    }
  }