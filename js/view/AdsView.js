export default class AdsView {
    constructor() {
      this.adsContainer = document.getElementById('ads-container');
      this.searchForm = document.getElementById('search-form');
      this.paginationContainer = document.getElementById('pagination-container');
    }
  
    renderAds(ads) {
        this.adsContainer.innerHTML = '';
        ads.forEach(ad => {
            const adElement = document.createElement('div');
            adElement.classList.add('col-md-4', 'mb-4');
            adElement.innerHTML = `
              <div class="card">
                <img src="${ad.image}" class="card-img-top" alt="${ad.title}">
                <div class="card-body">
                  <h5 class="card-title">${ad.title}</h5>
                  <p class="card-text">${ad.description}</p>
                  <p class="card-text">Precio: ${ad.price}</p>
                  <p class="card-text">Tipo: ${ad.type}</p>
                  <a href="ad-details.html?id=${ad.id}" class="btn btn-primary">Ver detalles</a>
                </div>
              </div>
            `;
            this.adsContainer.appendChild(adElement);
        });
    }
  
    showLoading() {
      this.adsContainer.innerHTML = '<p>Cargando anuncios...</p>';
    }
  
    showError(message) {
      this.adsContainer.innerHTML = `<p class="text-danger">${message}</p>`;
    }
  
    showEmptyMessage() {
      this.adsContainer.innerHTML = '<p>No se encontraron anuncios.</p>';
    }
  
    renderPagination(currentPage, totalPages) {
      // Lógica para renderizar los botones de paginación
      // ...
    }
  
    bindSearch(handler) {
      this.searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(this.searchForm);
        const { name, description, type, tags } = Object.fromEntries(formData.entries());
        handler({ name, description, type, tags });
      });
    }
  }