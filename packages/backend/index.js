
// Cors + Express + Http
import cors from 'cors';
import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';

// .env
import 'dotenv/config';

// Internal
import { serverRoute as oldServerRoute, newServerRoute as serverRoute } from '../shared/utils/routes/index.js';
import setupWebSocket from './setup/websocket/index.js';
import { AuthEndpoints, FriendsEndpoints, NotesEndpoints, AccountEndpoints } from './endpoints/index.js';
import getUserIdFromCookie from './utils/getUserIdFromCookie/index.js';

const app = express();
const server = http.createServer(app);

setupWebSocket(server);

const unprotectedPaths = [
  serverRoute.auth.login.use(),
  serverRoute.auth.signup.use(),
  serverRoute.auth.verifyToken.use()
]

app.use(cookieParser()); 
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
/* app.use(async (req, res, next) => {
  if (unprotectedPaths.includes(req.url)) {
    next();
  }

  const { userId, message } = await getUserIdFromCookie(req);

  if (userId === 0) {
    res.status(401).send(message);
  } else {
    next();
  }
}) */

app.post(serverRoute.auth.login.use(), AuthEndpoints.login);
app.post(serverRoute.auth.signup.use(), AuthEndpoints.signup);
app.post(serverRoute.auth.verifyToken.use(), AuthEndpoints.verifyToken);

app.post(oldServerRoute.friends.use(), FriendsEndpoints.readAll);
app.post(oldServerRoute.friends.add.use(), FriendsEndpoints.create);
app.post(oldServerRoute.friends.remove.use(), FriendsEndpoints.delete);

app.get(serverRoute.notes.readAll.server(), NotesEndpoints.readAll);
app.get(serverRoute.notes.read.server(), NotesEndpoints.read);
app.post(serverRoute.notes.add.server(), NotesEndpoints.create);
app.put(serverRoute.notes.update.server(), NotesEndpoints.update);
app.delete(serverRoute.notes.delete.server(), NotesEndpoints.delete);

app.get(serverRoute.account.read.server(), AccountEndpoints.read);

server.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});
