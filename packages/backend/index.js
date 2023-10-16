
// Cors + Express + Http
import cors from 'cors';
import express from 'express';
import http from 'http';

// .env
import 'dotenv/config';

// Internal
import { serverRoute, newServerRoute } from '../shared/classes/routes/index.js';
import setupWebSocket from './setup/websocket/index.js';
import { AuthEndpoints, FriendsEndpoints, NotesEndpoints, AccountEndpoints } from './endpoints/index.js';

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.use(cors({
  origin: process.env.FRONTEND_URL,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(serverRoute.auth.login.use(), AuthEndpoints.login);
app.post(serverRoute.auth.signup.use(), AuthEndpoints.signup);
app.post(serverRoute.auth.verifyToken.use(), AuthEndpoints.verifyToken);

app.post(serverRoute.friends.use(), FriendsEndpoints.readAll);
app.post(serverRoute.friends.add.use(), FriendsEndpoints.create);
app.post(serverRoute.friends.remove.use(), FriendsEndpoints.delete);

app.post(serverRoute.notes.use(), NotesEndpoints.readAll);
app.post(serverRoute.notes.add.use(), NotesEndpoints.create);
app.post(serverRoute.notes.read.use(), NotesEndpoints.read);
app.post(serverRoute.notes.update.use(), NotesEndpoints.update);
app.post(serverRoute.notes.delete.use(), NotesEndpoints.delete);

app.get(newServerRoute.account.read.server(), AccountEndpoints.read);

server.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});
