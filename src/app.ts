import {config as setupDotenv} from 'dotenv';
setupDotenv();

import Database from './models';
import Crypto from './crypto';
import {app} from './my_http';

(async function start(): Promise<void> {
    console.log('Starting Open Tibia Login Server...');
    Crypto.init();
    await Database.connect({
        url: process.env['DATABASE_CONNECTION_URL'],
    });
    app.listen(3001, () => {
        console.log('Listening to port 3001...');
    });
})();

async function quit(): Promise<void> {
    console.log('...');
    await Database.disconnect();
    app.close();
}

process.on('SIGINT', quit);
process.on('SIGQUIT', quit);
