import { App, SSLApp, TemplatedApp, us_listen_socket, us_listen_socket_close } from 'uWebSockets.js';

import { config } from './services/config';

import TibiaHTTP from './http';
import TibiaTCP from './tcp';
import TibiaWebSocket from './websocket';

const TCP_ENABLED = config.tcp.enabled;
const TCP_HOST = config.tcp.host;
const TCP_PORTS = config.tcp.ports;
const HTTP_ENABLED = config.http.enabled;
const HTTP_HOST = config.http.host;
const HTTP_PORTS = config.http.ports;
const HTTP_SSL_ENABLED = config.http.ssl.enabled;
const HTTP_SSL_CERT = config.http.ssl.cert;
const HTTP_SSL_KEY = config.http.ssl.key;
const HTTP_SSL_PASSPHRASE = config.http.ssl.passphrase;

export default class Server {
    app: TemplatedApp;
    tcps: TibiaTCP[] = [];
    http: TibiaHTTP;
    ws: TibiaWebSocket;
    sockets: us_listen_socket[] = [];

    start = async () => {
        if (TCP_ENABLED) {
            TCP_PORTS.forEach(port => {
                let tcp = new TibiaTCP();
                tcp.start(TCP_HOST, port);
                this.tcps.push(tcp);
            })
        }

        if (HTTP_ENABLED) {
            if (HTTP_SSL_ENABLED) {
                try {
                    this.app = SSLApp({
                        cert_file_name: HTTP_SSL_CERT,
                        key_file_name: HTTP_SSL_KEY,
                        passphrase: HTTP_SSL_PASSPHRASE,
                    });
                } catch (e) {
                    throw `${e.toString()}\nMake sure if your SSL config for http server is correct`;
                }
            } else {
                this.app = App({});
            }
            this.http = new TibiaHTTP();
            this.ws = new TibiaWebSocket();

            this.http.start(this.app);
            this.ws.start(this.app);

            HTTP_PORTS.forEach(async (port) => {
                await new Promise((resolve) => {
                    this.app.listen(HTTP_HOST, port, (listenSocket) => {
                        if (listenSocket) {
                            this.sockets.push(listenSocket);
                            resolve(undefined);
                        }
                    });
                });
            });
        }
    }

    stop = () => {
        this.tcps.forEach(tcp => {
            tcp.stop();
        });
        this.tcps = [];

        this.sockets.forEach(socket => {
            us_listen_socket_close(socket);
        });
        this.sockets = [];

        if (this.app) {
            this.http.stop();
            this.ws.stop();
            this.http = null;
            this.ws = null;
            this.app = null;
        }
    }
}