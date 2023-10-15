
// Cors + Express + Http
import cors from 'cors';
import express from 'express';
import http from 'http';

// .env
import 'dotenv/config';

// Internal
import { serverRoute } from '../shared/classes/routes/index.js';
import setupWebSocket from './setup/websocket/index.js';
import { AuthEndpoints, FriendsEndpoints, NotesEndpoints, AccountEndpoints } from './endpoints/index.js';
import pool from './databases/postgres/index.js';

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authEndpoints = new AuthEndpoints(pool);
app.post(serverRoute.auth.login.use(), authEndpoints.login);
app.post(serverRoute.auth.signup.use(), authEndpoints.signup);
app.post(serverRoute.auth.verifyToken.use(), authEndpoints.verifyToken);

const friendsEndpoints = new FriendsEndpoints(pool);
app.post(serverRoute.friends.use(), friendsEndpoints.readAll);
app.post(serverRoute.friends.add.use(), friendsEndpoints.create);
app.post(serverRoute.friends.remove.use(), friendsEndpoints.delete);

const notesEndpoints = new NotesEndpoints(pool);
app.post(serverRoute.notes.use(), notesEndpoints.readAll);
app.post(serverRoute.notes.add.use(), notesEndpoints.create);
app.post(serverRoute.notes.read.use(), notesEndpoints.read);
app.post(serverRoute.notes.update.use(), notesEndpoints.update);
app.post(serverRoute.notes.delete.use(), notesEndpoints.delete);

const accountEndpoints = new AccountEndpoints(pool);
app.post(serverRoute.account.use(), accountEndpoints.read);

server.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});
