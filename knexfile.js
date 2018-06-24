require('dotenv').load();

module.exports = {
    development: {
      client: 'mysql',
      connection: { 
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME,
        charset: 'utf8',
       }
    },
    production: { },
    seeds: {
        directory: './seeds'
    },
    migrations: {
        directory: './migrations'
    }
};