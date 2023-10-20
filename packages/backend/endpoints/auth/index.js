
import JWT from '../../../shared/utils/JWT.js';
import pool from '../../databases/postgres/index.js';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Handles authentication endpoints.
 * @class
 */
class AuthEndpoints {
	/**
	 * Handles user login.
	 * @param {Request} req The request object
	 * @param {Response} res The response object
	 */
	static async login(req, res) {
		try {
			const client = await pool.connect();

			/** @type { import('../../../shared/interfaces/index.js').LoginRequestProps } */
			const { email, password } = req.body;

			const query = 'SELECT * FROM public.user WHERE email = $1 LIMIT 1';
			const values = [email];

			const { rows } = await client.query(query, values);
			const user = rows[0];

			if (!user || user.password !== password) {
				return res.status(400).json({ success: false, message: "Données erronées" });
			}

			await client.release(true);

			const jwt = await JWT.sign({ userID: user.id });

			return res.status(200).json({ success: true, message: 'Connected successfully', jwt: jwt });

		} catch (err) {
			console.error(err);

			return res.status(500).json({ success: false, message: 'Internal Server Error' })
		}
	}

	/**
	 * Checks if the given email is already in use.
	 * @param {string} email The email to check
	 * @return {Promise<boolean>}
	 */
	static async isEmailUsed(email) {
		try {
			const client = await pool.connect();

			const query = 'SELECT EXISTS(SELECT * FROM public.user WHERE email = $1)';
			const values = [email];

			const { rows } = await client.query(query, values);
			const userExists = rows[0].exists;

			if (userExists) {
				return true;
			}

			await client.release(true);

			return false;

		} catch (err) {
			console.error(err);

			return false;
		}
	}

	/**
	 * Handles user signup.
	 * @param {Request} req The request object
	 * @param {Response} res The response object
	 */
	static async signup(req, res) {
		try {
			const client = await pool.connect();

			/** @type { import('../../../shared/interfaces/index.js').SignUpRequestProps } */
			const { firstName, lastName, email, password } = req.body;

			if (this.isEmailUsed(email)) {
				return res.status(400).json({ success: false, message: 'Données erronées' });
			}

			const query = 'INSERT INTO public.user (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id;';
			const values = [firstName, lastName, email, password];

			const { rows } = await client.query(query, values);
			const userID = rows[0].id;

			await client.release(true);

			const jwt = await JWT.sign({ userID: userID });

			return res.status(200).json({ success: true, message: 'Account created successfully', jwt: jwt });

		} catch (err) {
			console.error(err);

			return res.status(500).json({ success: false, message: 'Internal Server Error' })
		}
	}

	/**
	 * Verifies the user's token.
	 * @param {Request} req The request object
	 * @param {Response} res The response object
	 */
	static async verifyToken(req, res) {
		try {
			/** @type { import('../../../shared/interfaces/index.js').VerifyTokenRequestProps } */
			const { jwt } = req.body;

			const payload = await JWT.verify(jwt);

			return res.status(200).json({ success: true, message: 'Token verified successfully', payload: payload });

		} catch (err) {
			if (err.code === 'ERR_JWS_INVALID') {
				return res.status(401).json({ success: false, message: 'Invalid Token' })
			}

			return res.status(500).json({ success: false, message: 'Internal Server Error' })
		}
	}
}

export default AuthEndpoints;
