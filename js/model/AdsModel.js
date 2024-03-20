
function parseAds(data) {
  return data.map(ad => ({
      id: ad.id,
      image: ad.image,
      title: ad.title,
      description: ad.description,
      price: ad.price,
      type: ad.type,
      tags: Array.isArray(ad.tags) ? ad.tags.join(', ') : ''  
  }));
}

export default class AdsModel {
  async getAds(page = 1, limit = 10, searchParams = {}) {
    const url = new URL('http://127.0.0.1:8000/api/ads');
    url.searchParams.append('_page', page);
    url.searchParams.append('_limit', limit);

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) {
        url.searchParams.append(key, value);
      }
    });
    
    const response = await fetch(url.toString(), {
      method: 'GET'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener los anuncios');
    }
    
    const data = await response.json();
    return {
      ads: parseAds(data),
      total: parseInt(response.headers.get('X-Total-Count')) 
    };
  }
  
  async getAdDetails(adId) {
    const response = await fetch(`http://127.0.0.1:8000/api/ads/${adId}`, {
      method: 'GET'
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al obtener los detalles del anuncio');
    }
    
    const data = await response.json();
    return data;
  }

  async deleteAd(adId) {
    const response = await fetch(`http://127.0.0.1:8000/api/ads/${adId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  
    if (!response.ok) {
      throw new Error('Error al eliminar el anuncio');
    }
  }

  async updateAd(adId, adData, imageUrl) {
    const response = await fetch(`http://127.0.0.1:8000/api/ads/${adId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ ...adData, imageUrl })
    });
  
    if (!response.ok) {
      throw new Error('Error al actualizar el anuncio');
    }
  
    const updatedAd = await response.json();
    return updatedAd;
  }

  async uploadImage(file) {
    const formData = new FormData();
    formData.append('file', file); 
  
    const response = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al subir imagen.');
    }
  
    const data = await response.json();
    return data.path; 
  }
}