var config = {}

config.PORT = 3000;
config.HOST = process.env.HOST || '0.0.0.0';

config.MONGO_URL = process.env.MONGO_URL || 'mongodb://mongo/test';

module.exports = config;