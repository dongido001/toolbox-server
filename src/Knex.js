'use strict';

var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST || '127.0.0.1',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME
    },
    pool: { min: 0, max: 7 }
});

export default knex;
