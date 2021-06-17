import Config from './config';
import Crypto from './crypto';
import DB from './db';
import {app} from './my_http';
import Server from './server';

let working = false;
// const server = new Server();

console.log('Starting Open Tibia Login Server...');
Crypto.init();

// // DB.start()
// //     .then(() => {
// //         console.log('Connected to mysql database');
// //         server
// //             .start()
// //             .then(() => {
// //                 console.log('Running');
// //                 working = true;
// //             })
// //             .catch((e) => {
// //                 DB.stop();
// //                 console.log('Error: can\'t start server');
// //                 console.log(e);
// //                 process.exit(-1);
// //             });
// //     })
// //     .catch((e) => {
// //         console.log('Error: can\'t connect to mysql host');
// //         console.log(e);
// //         process.exit(-1);
// //     });

// const quit = () => {
//     if (!working) return;
//     working = false;
//     console.log('Exiting...');
//     server.stop();
//     DB.stop();
// };

app.listen(3001, () => {
    console.log('Listening...');
});

function onQuit() {
    app.close();
}

process.on('SIGINT', onQuit);
process.on('SIGQUIT', onQuit);
