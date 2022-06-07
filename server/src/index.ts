import dotenv from 'dotenv';

dotenv.config();

import config from './config/config';

import MongoDBConnection from './database/mongodb/MongoDB';

import App from './app/app';

async function main() {
    const { url } = config.database;
    const DB = new MongoDBConnection(url);
    DB.connect();
    const app = new App(config.server.port);
    await app.listen();
}

main();