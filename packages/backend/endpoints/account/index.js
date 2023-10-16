
import pool from '../../databases/postgres/index.js';

/**
 * Handles account endpoints.
 * @class
 */
class AccountEndpoints {
  /**
   * Fetches a user's data.
   * @param {{ params: { userId: string} }} req The request object
   * @param {Express.Response} res The response object
   */
  static async read({ params: { userId } }, res) {
    try {
      const client = await pool.connect();

      const query = 'SELECT * FROM public.user WHERE id = $1 LIMIT 1;';
      const values = [userId];

      const { rows } = await client.query(query, values);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Fetched account data successfully', data: JSON.stringify(rows[0]) });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }
}

export default AccountEndpoints;
