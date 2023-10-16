import ClientRoute from "./client.route.js";
import ServerRoute from "./server.route.js";
import NewServerRoute from "./server.route.new.js";

/** Shorthand for {@link ClientRoute.object()} */
export const clientRoute = ClientRoute.object();

/** Shorthand for {@link ServerRoute.object()} */
export const serverRoute = ServerRoute.object();

/** Shorthand for {@link NewServerRoute.object()} */
export const newServerRoute = NewServerRoute.object();
