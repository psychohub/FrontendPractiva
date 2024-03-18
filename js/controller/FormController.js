import AdsModel from '../model/AdsModel.js';
import FormView from '../view/FormView.js';

export default class FormController {
  constructor() {
    this.model = new AdsModel();
    this.view = new FormView();
  }

  async createAd() {
    this.view.showLoading();
    try {
      const formData = this.view.getFormData();
      await this.model.createAd(formData);
      this.view.showSuccess('Anuncio creado correctamente');
      this.view.clearForm();
    } catch (error) {
      this.view.showError('Error al crear el anuncio');
    } finally {
      this.view.hideLoading();
    }
  }

  // Implementa otras funciones para actualizar un anuncio
}