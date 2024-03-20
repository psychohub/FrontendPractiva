export default class AdsView {
    constructor() {
      this.adsContainer = document.getElementById('ads-container');
      this.searchForm = document.getElementById('search-form');
      this.paginationContainer = document.getElementById('pagination-container');
    }
  
    renderAds(ads) {
      this.adsContainer.innerHTML = '';
      
      if (ads.length === 0) {
        this.showEmptyMessage();
        return;
      }
      
      ads.forEach(ad => {
        const adElement = document.createElement('div');
        adElement.classList.add('col-md-4', 'mb-4');
        
        let imageHtml = '';
        if (ad.image && ad.image.startsWith('http')) {
          imageHtml = `<img src="${ad.image}" class="card-img-top" alt="${ad.title}">`;
        } else {
          imageHtml = `<div class="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">Sin imagen</div>`;
        }
        
        adElement.innerHTML = `
          <div class="card">
            ${imageHtml}
            <div class="card-body">
              <h5 class="card-title">${ad.title}</h5>
              <p class="card-text">${ad.description}</p>
              <p class="card-text">Precio: ${ad.price}</p>
              <p class="card-text">Tipo: ${ad.type}</p>
              <a href="detail.html?id=${ad.id}" class="btn btn-primary">Ver detalles</a>
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
      this.paginationContainer.innerHTML = '';

      if (totalPages > 1) {
          if (currentPage > 1) {
              const prevBtn = document.createElement('button');
              prevBtn.innerText = 'Anterior';
              prevBtn.addEventListener('click', () => this.handlePagination(currentPage - 1));
              this.paginationContainer.appendChild(prevBtn);
          }

          if (currentPage < totalPages) {
              const nextBtn = document.createElement('button');
              nextBtn.innerText = 'Siguiente';
              nextBtn.addEventListener('click', () => this.handlePagination(currentPage + 1));
              this.paginationContainer.appendChild(nextBtn);
          }
      }
  }

  bindPagination(handler) {
      this.handlePagination = handler; 
  }
  
    bindSearch(handler) {
      this.searchForm.addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(this.searchForm);
        const searchParams = Object.fromEntries(formData.entries());
        handler(searchParams);
      });
    }
  }