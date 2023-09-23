
import express from 'express';
import 'dotenv/config';
import { DBPool } from './databases/postgres/index.js';
import JWT from '../../shared/classes/JWT.js';
import { serverRoute } from '../../shared/classes/route/index.js';

const pool = new DBPool();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post(serverRoute.auth.login.use(), async (req, res) => {
  try {
    const client = await pool.connect();

    /** @type { import('../../shared/interfaces').LoginProps } */
    const body = req.body;

    const userQuery = 'SELECT * FROM public.user WHERE email = $1 LIMIT 1';
    const userValues = [body.email];

    const { rows } = await client.query(userQuery, userValues);

    if (rows.length === 0) {
      return res.status(400).json({ success: false, message: `User with email "${body.email}" does not exist` });
    }

    const user = rows[0];

    if (user.password !== body.password) {
      return res.status(400).json({ success: false, message: 'The passwords do not match' });
    }

    await client.release(true);

    const jwt = await JWT.sign({ userID: user.id });

    return res.status(200).json({ success: true, message: 'Connected successfully', jwt: jwt });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post(serverRoute.auth.signup.use(), async (req, res) => {
  try {
    const client = await pool.connect();

    /** @type { import('../../shared/interfaces').SignUpProps } */
    const body = req.body;

    const userExistsQuery = 'SELECT EXISTS(SELECT * FROM public.user WHERE email = $1)';
    const email = [body.email];

    let queryResponse = await client.query(userExistsQuery, email);

    const userExists = queryResponse.rows[0].exists;

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newAccountQuery = 'INSERT INTO public.user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
    const newAccountValues = [body.firstName, body.lastName, body.email, body.password];

    await client.query(newAccountQuery, newAccountValues);

    const getTokenQuery = 'SELECT id from public.user WHERE email = $1 LIMIT 1';

    queryResponse = await client.query(getTokenQuery, email);

    const userID = queryResponse.rows[0].id;

    await client.release(true);

    const jwt = await JWT.sign({ userID: userID });

    return res.status(200).json({ success: true, message: 'Account created successfully', jwt: jwt });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post(serverRoute.auth.verifyToken.use(), async (req, res) => {
  /** @type { import('../../shared/interfaces').VerifyTokenProps } */
  const body = req.body;

  try {
    const payload = await JWT.verify(body.jwt);

    return res.status(200).json({ success: true, message: 'Token verified successfully', payload: payload });

  } catch (err) {
    if (err.code === 'ERR_JWS_INVALID') {
      return res.status(401).json({ success: false, message: 'Invalid Token' })
    }

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
})

app.post(serverRoute.friends.add.use(), async (req, res) => {
  /** @type { import('../../shared/interfaces').FriendRequestProps } */
  const body = req.body;

  try {
    const client = await pool.connect();

    const addFriendQuery = 'INSERT INTO public.friendship (first_user_id, second_user_id) VALUES ($1, $2)';

    const firstUserID = Math.min(body.firstUserID, body.secondUserID);
    const secondUserID = Math.max(body.firstUserID, body.secondUserID);

    await client.query(addFriendQuery, [firstUserID, secondUserID]);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Friend added successfully' });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post(serverRoute.friends.remove.use(), async (req, res) => {
  /** @type { import('../../shared/interfaces').FriendRequestProps } */
  const body = req.body;

  try {
    const client = await pool.connect();

    const removeFriendQuery = 'DELETE FROM public.friendship WHERE first_user_id = $1 AND second_user_id = $2';

    const firstUserID = Math.min(body.firstUserID, body.secondUserID);
    const secondUserID = Math.max(body.firstUserID, body.secondUserID);

    await client.query(removeFriendQuery, [firstUserID, secondUserID]);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Friend removed successfully' });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post(serverRoute.notes.use(), async (req, res) => {
  try {
    const client = await pool.connect();

    /** @type {{ userID: number }} */
    const body = req.body;

    const fetchNotesQuery = 'SELECT * FROM public.note WHERE user_id = $1;';
    const fetchNotesValues = [body.userID];

    const { rows } = await client.query(fetchNotesQuery, fetchNotesValues);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Fetched notes successfully', notes: JSON.stringify(rows) });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post(`${serverRoute.notes.use()}/read`, async (req, res) => {
  try {
    const client = await pool.connect();

    /** @type {import('../../shared/interfaces').ReadNoteProps} */
    const body = req.body;

    const fetchNoteQuery = 'SELECT * FROM public.note WHERE id = $1 AND user_id = $2 LIMIT 1;';
    const fetchNoteValues = [body.id, body.userID];

    const { rows } = await client.query(fetchNoteQuery, fetchNoteValues);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Fetched note successfully', note: JSON.stringify(rows[0]) });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post(serverRoute.notes.edit.use(), async (req, res) => {
  try {
    const client = await pool.connect();

    /** @type {import('../../shared/interfaces').EditNoteProps} */
    const body = req.body;

    const updateNoteQuery = 'UPDATE public.note SET title = $1, content = $2 WHERE id = $3;';
    const updateNoteValues = [body.title, body.content, body.id];

    await client.query(updateNoteQuery, updateNoteValues);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Updated note successfully' });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post(serverRoute.notes.add.use(), async (req, res) => {
  try {
    console.log("ENDPOINT");
    const client = await pool.connect();

    /** @type { import('../../shared/interfaces').AddNoteProps } */
    const body = req.body;

    console.log(body)

    const newNoteQuery = 'INSERT INTO public.note (user_id, title, content) VALUES ($1, $2, $3) RETURNING id';
    const newNoteValues = [body.userID, body.title, body.content];

    const { rows } = await client.query(newNoteQuery, newNoteValues);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Added note successfully', noteId: rows[0].id });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post(serverRoute.notes.remove.use(), async (req, res) => {
  try {
    const client = await pool.connect();

    /** @type { import('../../shared/interfaces').RemoveNoteProps } */
    const body = req.body;

    const deleteNoteQuery = 'DELETE FROM public.note WHERE id = %1 AND user_id = %2';
    const deleteNoteValues = [body.id, body.userID];

    await client.query(deleteNoteQuery, deleteNoteValues);

    await client.release(true);

    return res.status(200).json({ success: true, message: 'Removed note successfully' });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});
