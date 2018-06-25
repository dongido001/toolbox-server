'use strict';

import 'dotenv/config';
import Hapi from 'hapi';
import Knex from './Knex';
import Routes from './Routes';
import validate from './Helpers/auth'

// Create a server with a host and port
const server=Hapi.server({
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 9393,
});


// Add the route
server.route(Routes);

// Start the server
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt',
    { key: process.env.KEY,
        validate: validate,
        verifyOptions: { algorithms: [ 'HS256' ] }
    });

    server.auth.default('jwt');

    console.log('Server running at:', server.info.uri);
    // console.log(process.env)
};

start();