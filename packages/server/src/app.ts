import 'dotenv/config';
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

const app = express();
const server = createServer(app);
/* const io =  */new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.listen(process.env.SERVER_PORT, () => {
    process.stdout.write('\x1Bc'); // Clears the console

    console.log(`[Postgres] > Running on port 8080`);
    console.log(`[Server] > Running on port ${process.env.SERVER_PORT}`);
});
