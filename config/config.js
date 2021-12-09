var config = {}

config.port = process.env.PORT || 3000;
config.host = '0.0.0.0';

config.DB_URL = 'mongodb://localhost/news';

module.exports = config;