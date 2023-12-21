"use client";

// Socket IO
import { io } from "socket.io-client";

// Internal
import { useEffect } from "react";

/** A client-side hook to manage the websocket connection. */
const useWebSocket = () => {
    const socket = io(`http://localhost:3000/api/socket`, {
        autoConnect: false,
    });

    useEffect(() => {
        if (!socket.connected) {
            socket.connect();
        }
    }, []);

    return { socket };
};

export default useWebSocket;
