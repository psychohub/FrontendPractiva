import AdsModel from '../model/AdsModel.js';
import AdsView from '../view/AdsView.js';

export default class AdsController {
  constructor() {
    this.model = new AdsModel();
    this.view = new AdsView();
  }

  async showAds() {
    this.view.showLoading();
    try {
      const ads = await this.model.getAds();
      this.view.renderAds(ads);
    } catch (error) {
      this.view.showError('Error al cargar los anuncios');
    } finally {
      this.view.hideLoading();
    }
  }

  // Implementa otras funciones para crear, actualizar y eliminar anuncios
}