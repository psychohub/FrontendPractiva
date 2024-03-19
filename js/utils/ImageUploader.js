export default class ImageUploader {
    static async uploadImage(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:8000/upload', {
                method: 'POST',
                body: formData, 
            });
            const data = await response.json();
            if (response.ok) {
                return data.path; 
            } else {
                throw new Error(data.message || 'Error al subir imagen.');
            }
        } catch (error) {
            throw error; 
        }
    }
}
