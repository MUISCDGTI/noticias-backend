const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});

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

}

module.exports = FilmsResource;
