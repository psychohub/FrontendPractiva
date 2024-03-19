export default class CreateAdView {
    constructor() {
        this.adsContainer = document.getElementById('ads-container');
        this.loadingIndicator = document.getElementById('loading-indicator');
        this.form = document.getElementById('create-ad-form');
        this.errorMessage = document.getElementById('error-message');
        this.successMessage = document.getElementById('success-message');
      }

      bindSubmit(handler) {
        this.form.addEventListener('submit', async (event) => {
          event.preventDefault();
          const formData = new FormData(this.form);
          await handler(formData);
        });
      }

    getFormData() {
        const adImage = this.form.querySelector('#ad-image').files[0]; 
        const adName = this.form.querySelector('#ad-name').value;
        const adDescription = this.form.querySelector('#ad-description').value;
        const adPrice = this.form.querySelector('#ad-price').value;
        const adType = this.form.querySelector('select[name="type"]').value;
        const adTags = this.form.querySelector('#ad-tags').value.split(',').map(tag => tag.trim()); 

        return {
            image: adImage, 
            description: adDescription,
            price: adPrice,
            type: adType,
            tags: adTags
        };
    }
    
    showLoading() {
        if (this.adsContainer) {
            this.adsContainer.style.display = 'none';
        }
        if (this.loadingIndicator) {
            this.loadingIndicator.style.display = 'block';
        }
        if (this.errorMessage) {
            this.errorMessage.style.display = 'none';
        }
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

      showSuccess(message) {
        this.successMessage.textContent = message;
        this.successMessage.style.display = 'block';
      }

    }