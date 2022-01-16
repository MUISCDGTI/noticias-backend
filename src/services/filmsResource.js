const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});

const CircuitBreaker = require('opossum');

class FilmsResource {
    
    static filmsUrl(resourceUrl) {
        const filmsServer = "https://api-drorganvidez.cloud.okteto.net";
        return urljoin(filmsServer, resourceUrl);
    }

    static requestHeaders() {
        const filmsKey = (process.env.FILMS_APIKEY);
        return {
            apiKey: filmsKey
        };
    }

    static getAllFilms() {
        const url = FilmsResource.filmsUrl('api/v1/films/?apikey=06271241-163c-4b95-bcb3-880be1e0be95');
        const options = {
            headers: FilmsResource.requestHeaders()
        }
        return request.get(url, options);
    }

    static getAllFilmsProtected() {
        return breaker.fire();
    }

}

const breaker = new CircuitBreaker(FilmsResource.getAllFilms(), {
    timeout: 5000,
    errorThresholdPercentage: 10,
});

breaker.fallback(() => 'El servicio no está funcionando correctamente.');

module.exports = FilmsResource;
