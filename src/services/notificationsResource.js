const urljoin = require('url-join');
const request = require('request-promise-native').defaults({json: true});

const CircuitBreaker = require('opossum');

class NotificationsResource {
    
    static notificationUrl(resourceUrl) {
        const notificationsServer = "https://suscripciones-amaliof96.cloud.okteto.net";
        return urljoin(notificationsServer, resourceUrl);
    }

    static requestHeaders() {
        const subscriptionKey = (process.env.FILMS_APIKEY);
        return {
            apiKey: subscriptionKey
        };
    }

    static notifyNotificationsService(newsId) {
        const url = NotificationsResource.notificationUrl('/api/v1/notifications');
        console.log(url);
        const options = {
            method: 'POST',
            headers: NotificationsResource.requestHeaders(),
            body: {
                "category" : "Noticia",
                "referenceId": newsId
            },
            json: true
        }
        console.log(options)
        return request.post(url, options);
    }      

    static notifyNotificationsServiceProtected(newsId) {
        return breaker.fire(newsId);
    }

}

const breaker = new CircuitBreaker(NotificationsResource.notifyNotificationsService, {
    timeout: 5000,
    errorThresholdPercentage: 10,
});

breaker.fallback(() => 'El servicio no está funcionando correctamente.');

breaker.on('reject')
breaker.on('open')
breaker.on('halfOpen')


module.exports = NotificationsResource;
