export default class CreateAdModel {
    
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
      
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Error al subir imagen.');
        }
        return data.path;
      }

    async createAd(adData) {
        const response = await fetch('http://localhost:8000/api/ads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(adData), 
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Error al crear anuncio.');
        }
        return data;
    }
}
