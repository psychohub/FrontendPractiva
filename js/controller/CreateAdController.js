import CreateAdModel from '../model/CreateAdModel.js';
import { createAd } from '../model/ad-creation-model.js';
import CreateAdView from '../view/CreateAdView.js';
import { checkAuth } from '../utils/checkAuth.js'; 
import ImageUploader from '../utils/ImageUploader.js';




document.addEventListener('DOMContentLoaded', () => {
    checkAuth(); 
    const adView = new CreateAdView();
    const adController = new CreateAdController(adView);
});


export default class CreateAdController {
    constructor(view) {  
        this.model = new CreateAdModel();
        this.view = view; 
        this.view.bindSubmit(this.handleSubmit.bind(this));
    }

    

    async handleSubmit(formData) {
        this.view.showLoading();
        try {
          const title = formData.get('name');
          const description = formData.get('description');
          const price = formData.get('price');
          const type = formData.get('type');
          const tags = formData.get('tags').split(',').map(tag => tag.trim());
      

          let imageUrl = null;
          if (formData.has('image')) {
            const file = formData.get('image');
            imageUrl = await this.model.uploadImage(file);
          }
      
          await createAd(title, description, price, type, tags, imageUrl);
          this.view.showSuccess('Anuncio creado con éxito.');
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        } catch (error) {
          this.view.showError('Error al crear el anuncio: ' + error.message);
        } finally {
          this.view.hideLoading();
        }
      }
}
