'use strict';

import 'dotenv/config';
import Hapi from 'hapi';
import Knex from './Knex';
import Routes from './Routes';

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

    console.log('Server running at:', server.info.uri);
    // console.log(process.env)
};

start();