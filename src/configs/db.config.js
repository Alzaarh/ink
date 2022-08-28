const db = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 27017,
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || '',
    name: process.env.DB_NAME || 'ink',
};

module.exports = db;