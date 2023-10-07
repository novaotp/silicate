
interface UseWebSocketReturnProps {
  /** The socket itself. */
  socket: any;
  /** Connects the client to the socket if not already connected. */
  ensureSocketConnected: () => void;
}

export default UseWebSocketReturnProps;
