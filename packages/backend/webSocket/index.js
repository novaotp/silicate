
import { Server as IOServer } from 'socket.io';
import http from 'http';

/**
 * Sets up the websocket for the server.
 * @param {http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>} server The server to append the websocket to.
 */
const setupWebSocket = (server) => {
  const io = new IOServer(server, {
    serveClient: false,
    cors: {
      origin: process.env.FRONTEND_URL,
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected : ${socket.id}`);
  });
}

export default setupWebSocket;
