var config = {}

config.PORT = process.env.PORT || 3000;
config.HOST = process.env.HOST || '0.0.0.0';

config.DB_URL = process.env.DB_URL || 'mongodb://localhost/news';

module.exports = config;