export default class DetailView {
  constructor() {
    this.adContainer = document.getElementById('ad-container');
    this.loadingIndicator = document.getElementById('loading-indicator');
    this.errorMessage = document.getElementById('error-message');
    this.editButton = document.getElementById('edit-button');
    this.deleteButton = document.getElementById('delete-button');
    this.currentAdImage = document.getElementById('image-input');
  }

  showLoading() {
    this.adContainer.style.display = 'none';
    this.loadingIndicator.style.display = 'block';
    this.errorMessage.style.display = 'none';
  }

  hideLoading() {
    this.loadingIndicator.style.display = 'none';
  }

  showError(message) {
    this.adContainer.style.display = 'none';
    this.errorMessage.textContent = message;
    this.errorMessage.style.display = 'block';
  }

  showAd(ad) {
    let imageHtml = '';
    this.currentAdImage = ad.image;
    if (ad.image && ad.image.startsWith('http')) {
      imageHtml = `<img src="${ad.image}" class="card-img-top" alt="${ad.title}">`;
    } else {
      imageHtml = `<div class="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">Sin imagen</div>`;
    }


    this.adContainer.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          ${imageHtml}
        </div>
        <div class="col-md-6">
          <h2>${ad.title}</h2>
          <p>${ad.description}</p>
          <p>Precio: ${ad.price}</p>
          <p>Tipo: ${ad.type}</p>
        </div>
      </div>
    `;

    this.adContainer.style.display = 'block';
  }

  showEditForm(ad) {
    let imageHtml = '';
    this.currentAdImage = ad.image;
    if (ad.image && ad.image.startsWith('http')) {
      imageHtml = `<img src="${ad.image}" class="card-img-top" alt="${ad.title}">`;
    } else {
      imageHtml = `<div class="card-img-top bg-secondary text-white d-flex align-items-center justify-content-center" style="height: 200px;">Sin imagen</div>`;
    }

  
    this.adContainer.innerHTML = `
      <div class="row">
        <div class="col-md-6">
          ${imageHtml}
        </div>
        <div class="col-md-6">
          <form id="edit-form">
            <div class="mb-3">
              <label for="title-input" class="form-label">Título</label>
              <input type="text" class="form-control" id="title-input" value="${
                ad.title
              }" required>
            </div>
            <div class="mb-3">
              <label for="description-input" class="form-label">Descripción</label>
              <textarea class="form-control" id="description-input" required>${
                ad.description
              }</textarea>
            </div>
            <div class="mb-3">
              <label for="price-input" class="form-label">Precio</label>
              <input type="number" class="form-control" id="price-input" value="${
                ad.price
              }" required>
            </div>
            <div class="mb-3">
              <label for="type-select" class="form-label">Tipo</label>
              <select class="form-select" id="type-select" required>
                <option value="venta" ${
                  ad.type === "venta" ? "selected" : ""
                }>Venta</option>
                <option value="compra" ${
                  ad.type === "compra" ? "selected" : ""
                }>Compra</option>
              </select>
            </div>
            <div class="mb-3">
            <label for="image-input" class="form-label">Imagen</label>
            <input type="file" class="form-control" id="image-input">
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
            <button type="button" class="btn btn-secondary" id="cancel-button">Cancelar</button>
          </form>
        </div>
      </div>
    `;
  
    this.adContainer.style.display = 'block';
  }

  showEditControls() {
    this.editButton.style.display = 'none';
    this.deleteButton.style.display = 'none';
  }
  
  hideEditControls() {
    this.editButton.style.display = 'inline-block';
    this.deleteButton.style.display = 'inline-block';
  }

  hideEditButton() {
    this.editButton.style.display = 'none';
  }

  bindEditForm(handler) {
    const editForm = document.getElementById('edit-form');
    editForm.addEventListener('submit', handler);
  }
  
  bindCancelButton(handler) {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', handler);
  }

  showDeleteButton() {
    this.deleteButton.style.display = 'inline-block';
  }

  hideDeleteButton() {
    this.deleteButton.style.display = 'none';
  }

  bindEditButton(handler) {
    this.editButton.addEventListener('click', handler);
  }

  bindDeleteButton(handler) {
    this.deleteButton.addEventListener('click', handler);
  }

  showEditButton() {
    this.editButton.style.display = 'block';
}
}