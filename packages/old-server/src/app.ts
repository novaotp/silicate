import 'dotenv/config';
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import { router } from './router.js';
import { onSocketConnection } from './socket.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

app.use(router);
io.on('connection', onSocketConnection);

server.listen(process.env.SERVER_PORT, () => {
    process.stdout.write('\x1Bc'); // Clears the console

    console.log(`[Postgres] > Running on port ${process.env.DB_PORT}`);
    console.log(`[Server] > Running on port ${process.env.SERVER_PORT}`);
});
