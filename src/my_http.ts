import fastify, {FastifyReply, FastifyRequest} from 'fastify';
import FastifyWebsocket, {SocketStream} from 'fastify-websocket';
import Status from './status';

export const app = fastify({
    logger: true,
});

app.register(FastifyWebsocket);

app.get('/', {websocket: true}, (connection: SocketStream) => {
    connection.socket.on('message', () => {
        connection.socket.send('Hi from server');
    });
});

app.get('/api', (_req: FastifyRequest, res: FastifyReply) => {
    res.send('API');
});

app.get('/status', (_req: FastifyRequest, res: FastifyReply) => {
    const status = Status.getCached(0);
    res.header('Content-Type', 'Application/XML');
    res.send(status);
});

app.get('/*', (_req: FastifyRequest, res: FastifyReply) => {
    res.send('Open Tibia Login Server - Invalid URL');
});
