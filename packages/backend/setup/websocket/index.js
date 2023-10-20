
import { Server as IOServer } from 'socket.io';
import { Server, IncomingMessage, ServerResponse } from 'http';

/**
 * Sets up the websocket for the server.
 * @param {Server<typeof IncomingMessage, typeof ServerResponse>} server The server to append the websocket to.
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
