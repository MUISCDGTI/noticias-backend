const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});

const CircuitBreaker = require('opossum');

class SuscriptionsResource {
    
    static subscriptionUrl(resourceUrl) {
        const susccriptionServer = (process.env.SUSCRIPTION_URL);
        return urljoin(susccriptionServer, resourceUrl);
    }

    static requestHeaders() {
        const subscriptionKey = (process.env.FILMS_APIKEY);
        return {
            apiKey: subscriptionKey
        };
    }

    static getAllSubscription() {
        const url = SubscriptionResource.subscriptionUrl('/subscription');
        const options = {
            headers: SubscriptionResource.requestHeaders()
        }
        return request.get(url, options);
    }

    static getRelatedSubscription(filmTitle) {
        const url = SubscriptionResource.susccriptionUrl('/susccription?title=' + filmTitle);
        const options = {
            headers: SubscriptionResource.requestHeaders()
        }
        return request.get(url, options);
    }      

    static getRelatedSubscriptionProtected(filmTitle) {
        breaker.fire(filmTitle).then(console.log).catch(console.error);
    }

}

const breaker = new CircuitBreaker(SubscriptionResource.getRelatedSubscription, {
    timeout: 5000,
    errorThresholdPercentage: 10,
});

breaker.fallback(() => 'El servicio no está funcionando correctamente.');

breaker.on('reject', (result) => console.log("El circuito está cerrado"))
breaker.on('open', (result) => console.log("El circuito está abierto"))
breaker.on('halfOpen', (result) => console.log("El circuito está medio abierto"))


module.exports = SubscriptionResource;
