
import { Server } from 'socket.io';
import { NextApiResponse } from 'next';

declare module 'http' {
  interface ServerResponse extends NextApiResponse {
    socket: ResponseSocket;
  }
}

interface ResponseSocket extends NodeJS.Socket {
  server: ResponseSocketServer;
}

interface ResponseSocketServer extends NodeJS.EventEmitter {
  io?: Server;
}
