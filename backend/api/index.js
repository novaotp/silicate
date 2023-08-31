
import express from 'express';
import 'dotenv/config';
import { DBPool } from './databases/postgres/index.js';
import JWT from '../../shared/classes/JWT.js';

const pool = new DBPool();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/auth/login', async (req, res) => {
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

    return res.status(200).json({ success: true, message: 'Connected successfully' });

  } catch (err) {
    console.error(err);

    return res.status(500).json({ success: false, message: 'Internal Server Error' })
  }
});

app.post('/auth/signup', async (req, res) => {
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

app.post('/auth/verifytoken', async (req, res) => {
  const body = req.body;

  console.log(body.jwt);

  const payload = await JWT.verify(body.jwt);

  return res.status(200).json({ success: true, message: 'Token verified successfully', payload: payload });
})

app.post('/friends/add', async (req, res) => {
  /** @type { import('../../shared/interfaces').FriendsProps } */
  const body = req.body;
});

app.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});
