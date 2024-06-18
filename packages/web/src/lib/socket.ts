import { PUBLIC_BACKEND_URL } from "$env/static/public";
import { Socket, io } from "socket.io-client";
 
/** The socket client. */
export let socket: Socket | null = null;
 
/** Initializes the socket connection if it isn't already set. */
export async function initSocket(jwt: string) {
    if (socket !== null) return;
 
    socket = io(PUBLIC_BACKEND_URL, {
        query: {
            "jwt": jwt
        },
        transports: ["websocket"],
        upgrade: false
    });
}