const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});

const CircuitBreaker = require('opossum');

class FilmsResource {
    
    static filmsUrl(resourceUrl) {
        const filmsServer = (process.env.FILMS_URL);
        return urljoin(filmsServer, resourceUrl);
    }

    static requestHeaders() {
        const filmsKey = (process.env.FILMS_APIKEY);
        return {
            apiKey: filmsKey
        };
    }

    static getAllFilms() {
        const url = FilmsResource.filmsUrl('/films');
        const options = {
            headers: FilmsResource.requestHeaders()
        }
        return request.get(url, options);
    }

    static getRelatedFilms(filmTitle) {
        const url = FilmsResource.filmsUrl('/films?title=' + filmTitle);
        const options = {
            headers: FilmsResource.requestHeaders()
        }
        return request.get(url, options);
    }      

    static getRelatedFilmsProtected(filmTitle) {
        breaker.fire(filmTitle).then(console.log).catch(console.error);
    }

}

const breaker = new CircuitBreaker(FilmsResource.getRelatedFilms, {
    timeout: 5000,
    errorThresholdPercentage: 10,
});

breaker.fallback(() => 'El servicio no está funcionando correctamente.');

breaker.on('reject', (result) => console.log("El circuito está cerrado"))
breaker.on('open', (result) => console.log("El circuito está abierto"))
breaker.on('halfOpen', (result) => console.log("El circuito está medio abierto"))


module.exports = FilmsResource;
