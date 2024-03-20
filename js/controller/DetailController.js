import DetailView from '../view/DetailView.js';
import AdsModel from '../model/AdsModel.js';

export default class DetailController {
  constructor() {
    this.view = new DetailView();
    this.model = new AdsModel();
    this.adId = null;
  }

  async initialize() {
    this.adId = this.getAdIdFromUrl();
    if (!this.adId) {
      this.view.showError('ID de anuncio no válido');
      return;
    }

    this.view.showLoading();
  try {
    const ad = await this.model.getAdDetails(this.adId);
    this.view.showAd(ad);

    const isAuthenticated = this.checkAuth();
    const userId = this.getUserId();
    const isOwner = isAuthenticated && ad.userId === parseInt(userId);

    if (isOwner) {
      this.view.showEditButton();
      this.view.showDeleteButton();
      this.view.bindEditButton(this.handleEdit.bind(this));
      this.view.bindDeleteButton(this.handleDelete.bind(this));
    } else {
      this.view.hideEditButton();
      this.view.hideDeleteButton();
    }
  } catch (error) {
    this.view.showError('Error al cargar el anuncio');
  } finally {
    this.view.hideLoading();
  }
}

getAdIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}


  checkAuth() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken.userId;
    }
    return null;
  }
  
  decodeToken(token) {
    const parts = token.split('.');
    if (parts.length !== 3) {
      throw new Error('Token inválido');
    }
    const payload = JSON.parse(atob(parts[1]));
    return payload;
  }

  async handleEdit() {
    const ad = await this.model.getAdDetails(this.adId);
    this.view.showEditForm(ad);
    this.view.showEditControls();
    this.view.bindEditForm(this.handleSaveEdit.bind(this));
    this.view.bindCancelButton(this.handleCancel.bind(this));
  }
  
  async handleSaveEdit(event) {
    event.preventDefault();
  
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const priceInput = document.getElementById('price-input');
    const typeSelect = document.getElementById('type-select');
    const imageInput = document.getElementById('image-input'); 
  
    let imageUrl = this.view.currentAdImage; 
    
   
    if (imageInput && imageInput.files.length > 0) {
        imageUrl = await this.model.uploadImage(imageInput.files[0]);
    }
    
    
    const updatedAd = {
        title: titleInput.value,
        description: descriptionInput.value,
        price: parseFloat(priceInput.value),
        type: typeSelect.value,
        image: imageUrl 
    };
    

    try {
        await this.model.updateAd(this.adId, updatedAd);
        window.location.reload();
    } catch (error) {
        this.view.showError('Error al guardar los cambios');
    }
  }
  
  handleCancel() {
    this.initialize();
  }


  async handleDelete() {
    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar este anuncio?');
    if (confirmDelete) {
      try {
        await this.model.deleteAd(this.adId);
        alert('Anuncio eliminado correctamente');
        window.location.href = 'index.html';
      } catch (error) {
        alert('Error al eliminar el anuncio');
      }
    }
  }
}