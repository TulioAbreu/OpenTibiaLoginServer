import express from "express";
import http from "http";
import { Server as SocketServer, Socket } from "socket.io"
import limits from "./limits";

const app = express();
const server  = http.createServer(app);
const io = new SocketServer(server);

io.on("connection", (socket: Socket) => {
    const remoteAddress = socket.handshake.address;
    if (!limits.acceptConnection(remoteAddress)) {
        return socket.disconnect();
    }

    socket.compress(false);

    socket.on("message", (data) => {
        console.log(data);
    });
});

