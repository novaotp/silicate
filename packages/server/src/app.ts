import 'dotenv/config';
import express from "express";
import { createServer } from 'http';
import { Server } from 'socket.io';
import swaggerUi from "swagger-ui-express";
import swaggerDocumentV1 from "../api/v1.swagger.json" with { type: "json" };
import { router } from './routes/router.js';

const app = express();
const server = createServer(app);
/* const io =  */new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL
    }
});

app.use('/api-docs/v1', swaggerUi.serve, swaggerUi.setup(swaggerDocumentV1));
app.use('/', router);

server.listen(process.env.SERVER_PORT, () => {
    process.stdout.write('\x1Bc'); // Clears the console

    console.log(`[Postgres] > Running on port 8080`);
    console.log(`[Server] > Running on port ${process.env.SERVER_PORT}`);
});
