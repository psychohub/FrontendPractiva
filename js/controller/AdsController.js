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
    this.view.bindPagination(this.handleChangePage.bind(this));
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
    const { ads } = await this.model.getAds(1, 10000); 
    const filteredAds = ads.filter(ad => {
        const nameMatch = searchParams.name ? ad.title.toLowerCase().includes(searchParams.name.toLowerCase()) : true;
        const descriptionMatch = searchParams.description ? ad.description.toLowerCase().includes(searchParams.description.toLowerCase()) : true;
        const typeMatch = searchParams.type === '' || ad.type === searchParams.type;
        return nameMatch && descriptionMatch && typeMatch;
    });
    this.view.renderAds(filteredAds);
    
    if (filteredAds.length === 0) {
        this.view.showEmptyMessage();
    }
  }

  async handleChangePage(newPage) {
    this.currentPage = newPage;
    await this.loadAds(); 
  }

  async handleSearch(searchParams) {
    this.currentPage = 1; 
    await this.loadAds(searchParams);
  }
}