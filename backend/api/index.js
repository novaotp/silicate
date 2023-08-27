
/** @typedef { import('../../shared/interfaces').SignUpProps } SignUpProps */

import express from 'express';
import 'dotenv/config';
import client from './databases/postgres/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const body = req.body;

  res.status(200).json();

  res.end();
});

app.post('/signup', async (req, res) => {
  try {
    /** @type SignUpProps */
    const body = req.body;

    const userExistsQuery = 'SELECT EXISTS(SELECT * FROM public.accounts WHERE email = $1)';
    const userExistsValues = [body.email]
    const { rows } = await client.query(userExistsQuery, userExistsValues);
    const userExists = rows[0].exists;
    
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

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