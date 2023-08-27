
import express from 'express';
import 'dotenv/config';
import client from './databases/postgres/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', async (req, res) => {
  try {
    /** @type { import('../../shared/interfaces').LoginProps } */
    const body = req.body;

    const userQuery = 'SELECT * FROM public.accounts WHERE email = $1 LIMIT 1';
    const userValues = [body.email];
    const { rows } = await client.query(userQuery, userValues);
    
    if (rows.length === 0) return res.status(400).json({ success: false, message: `User with email "${body.email}" does not exist` });

    const user = rows[0];

    if (user.password !== body.password) return res.status(400).json({ success: false, message: 'The passwords do not match' });

    return res.status(200).json({ success: true, message: 'Connected successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' })

  }
});

app.post('/signup', async (req, res) => {
  try {
    /** @type { import('../../shared/interfaces').SignUpProps } */
    const body = req.body;

    const userExistsQuery = 'SELECT EXISTS(SELECT * FROM public.accounts WHERE email = $1)';
    const userExistsValues = [body.email]
    const { rows } = await client.query(userExistsQuery, userExistsValues);
    const userExists = rows[0].exists;
    
    if (userExists) return res.status(400).json({ success: false, message: 'User already exists' });

    const newAccountQuery = 'INSERT INTO public.accounts (name, email, password) VALUES ($1, $2, $3)';
    const newAccountValues = [body.name, body.email, body.password];
    await client.query(newAccountQuery, newAccountValues);

    return res.status(200).json({ success: true, message: 'Account created successfully' });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: 'Internal Server Error' })

  }
});

app.listen(process.env.PORT, () => {
  console.log('API Listening on port ' + process.env.PORT);
});