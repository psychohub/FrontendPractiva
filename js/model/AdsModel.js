export default class AdsModel {
    static async getAds() {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/ads');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error al obtener los anuncios:', error);
        throw error;
      }
    }
  
    // Falta implementar crear, actualizar y eliminar anuncios
  }