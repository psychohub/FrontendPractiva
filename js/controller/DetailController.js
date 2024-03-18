import AdsModel from '../model/AdsModel.js';
import DetailView from '../view/DetailView.js';

export default class DetailController {
  constructor() {
    this.model = new AdsModel();
    this.view = new DetailView();
  }

  async showAdDetail(adId) {
    this.view.showLoading();
    try {
      const ad = await this.model.getAdById(adId);
      this.view.renderAd(ad);
    } catch (error) {
      this.view.showError('Error al cargar los detalles del anuncio');
    } finally {
      this.view.hideLoading();
    }
  }

  // Implementa otras funciones para eliminar un anuncio
}