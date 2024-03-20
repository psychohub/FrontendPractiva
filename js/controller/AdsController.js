import AdsModel from '../model/AdsModel.js';
import AdsView from '../view/AdsView.js';

export default class AdsController {
  constructor() {
    this.model = new AdsModel();
    this.view = new AdsView();

    this.currentPage = 1;
    this.totalPages = 1;

    this.initialize();
  }

  async initialize() {
    this.view.bindSearch(this.handleSearch.bind(this));
    await this.loadAds();
  }

  async loadAds(searchParams = {}) {
    this.view.showLoading();

    try {
      const { ads, total } = await this.model.getAds(this.currentPage, 10, searchParams);
      if (ads.length === 0) {
        this.view.showEmptyMessage();
      } else {
        this.view.renderAds(ads);
        this.totalPages = Math.ceil(total / 10);
        this.view.renderPagination(this.currentPage, this.totalPages);
      }
    } catch (error) {
      this.view.showError('Error al cargar los anuncios');
    }
  }

  async handleSearch(searchParams) {
    this.currentPage = 1;
    await this.loadAds(searchParams);
  }
}