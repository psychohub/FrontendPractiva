function parseAds(data) {
    return data.map(ad => ({
      title: ad.title,
      description: ad.description,
      price: ad.price,
      type: ad.type,
      tags: ad.tags,
      id: ad.id,
    }));
  }
  
  export async function getAds() {
    const url = 'http://localhost:8000/api/ads';
    let ads = [];
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      ads = parseAds(data);
    } catch (error) {
      throw new Error('Error al obtener anuncios');
    }
  
    return ads;
  }