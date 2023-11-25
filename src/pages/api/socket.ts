
import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import { type Server as HTTPServer } from 'http';

const SocketHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    console.log('New Socket.io server...');
    const io = new Server(res.socket.server as unknown as HTTPServer);

    io.on('connection', (socket) => {
      console.log(`Socket ${socket.id} connected.`);

      socket.on('message', (message) => {
        io.emit('message', message);
      });

      socket.on('disconnect', () => { console.log(`Socket ${socket.id} disconnected.`); });
    });

    res.socket.server.io = io;
  } else {
    console.log('Socket.io server already running');
  }
  res.end();
};

export default SocketHandler;
