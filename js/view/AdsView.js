export default class AdsView {
    constructor() {
      this.adsContainer = document.getElementById('ads-container');
      this.loadingIndicator = document.getElementById('loading-indicator');
      this.errorMessage = document.getElementById('error-message');
    }
  
    showLoading() {
      this.adsContainer.style.display = 'none';
      this.loadingIndicator.style.display = 'block';
      this.errorMessage.style.display = 'none';
    }
  
    hideLoading() {
      this.loadingIndicator.style.display = 'none';
    }
  
    showError(message) {
      this.adsContainer.style.display = 'none';
      this.errorMessage.textContent = message;
      this.errorMessage.style.display = 'block';
    }
  
    renderAds(ads) {
      this.adsContainer.innerHTML = '';
      ads.forEach((ad) => {
        const adElement = document.createElement('div');
        adElement.innerHTML = `
          <h3>${ad.name}</h3>
          <p>${ad.description}</p>
          <p>Precio: ${ad.price}</p>
          <a href="detail.html?id=${ad.id}">Ver detalles</a>
        `;
        this.adsContainer.appendChild(adElement);
      });
      this.adsContainer.style.display = 'block';
    }
  }