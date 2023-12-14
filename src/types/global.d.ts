
import { Server as NetServer, Socket } from "http";
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

declare module "next" {
  interface NextApiResponse {
    end(): unknown;
    socket: Socket & {
      server: NetServer & {
        io: SocketIOServer;
      };
    };
  };
};
