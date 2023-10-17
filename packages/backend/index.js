
// Cors + Express + Http
import cors from 'cors';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';

// .env
import 'dotenv/config';

// Internal
import { serverRoute as oldServerRoute, newServerRoute as serverRoute } from '../shared/classes/routes/index.js';
import setupWebSocket from './setup/websocket/index.js';
import { AuthEndpoints, FriendsEndpoints, NotesEndpoints, AccountEndpoints } from './endpoints/index.js';

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

app.use(cookieParser()); 
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(oldServerRoute.auth.login.use(), AuthEndpoints.login);
app.post(oldServerRoute.auth.signup.use(), AuthEndpoints.signup);
app.post(oldServerRoute.auth.verifyToken.use(), AuthEndpoints.verifyToken);

app.post(oldServerRoute.friends.use(), FriendsEndpoints.readAll);
app.post(oldServerRoute.friends.add.use(), FriendsEndpoints.create);
app.post(oldServerRoute.friends.remove.use(), FriendsEndpoints.delete);

app.post(oldServerRoute.notes.use(), NotesEndpoints.readAll);
app.post(oldServerRoute.notes.add.use(), NotesEndpoints.create);
app.post(serverRoute.notes.read.server(), NotesEndpoints.read);
app.post(oldServerRoute.notes.update.use(), NotesEndpoints.update);
app.post(oldServerRoute.notes.delete.use(), NotesEndpoints.delete);

app.get(serverRoute.account.read.server(), AccountEndpoints.read);

server.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});
