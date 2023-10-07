
"use client";

// React
import { useEffect } from 'react';

// SocketIO
import { io } from 'socket.io-client';

// Internal
import UseWebSocketReturnProps from './interfaces';

/** A client-side hook to manage the websocket connection. */
const useWebSocket = (): UseWebSocketReturnProps => {
  const socket = io(process.env.NEXT_PUBLIC_API_SERVER_URL!, {
    autoConnect: false
  });

  const ensureSocketConnected = (): void => {
    if (!socket.connected) {
      socket.connect();
    }
  }

  useEffect(() => {
    ensureSocketConnected()

    socket.on('connect', (): void => {
      console.log(socket.id);
    });
  
    // Cleanup
    return () => {
      socket.disconnect();
    }
  }, []);

  return {
    socket,
    ensureSocketConnected
  }
}

export default useWebSocket;
