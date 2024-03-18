class AdsModel {
    constructor() {
        this.ads = [];
    }

    fetchAds() {
        return fetch('http://127.0.0.1:8000/api/ads')
            .then(response => response.json())
            .then(data => this.ads = data)
            .catch(err => console.error('Error fetching ads:', err));
    }
}