
import pool from '../../databases/postgres/index.js';
import getUserIdFromCookie from '../../utils/getUserIdFromCookie/index.js';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 */

/**
 * Handles account endpoints.
 * @class
 */
class AccountEndpoints {
  /**
   * Fetches a user's data.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async read(req, res) {
    try {
      const client = await pool.connect();

      const { userId, message } = await getUserIdFromCookie(req);

      if (userId === 0) {
        return res.status(401).json({ success: false, message: message })
      }

      const query = 'SELECT * FROM public.user WHERE id = $1 LIMIT 1;';
      const values = [userId];

      const { rows } = await client.query(query, values);

      await client.release(true);

      const data = {
        id: rows[0].id,
        firstName: rows[0].first_name,
        lastName: rows[0].last_name,
        email: rows[0].email,
        password: rows[0].password
      }

      return res.status(200).json({ success: true, message: 'Fetched account data successfully', account: data });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }
}

export default AccountEndpoints;
