
import { Pool } from 'pg';

/**
 * Handles account endpoints.
 * @class
 */
class AccountEndpoints {
  /**
   * Creates an instance of AccountEndpoints.
   * @param {Pool} pool The database pool
   */
  constructor(pool) {
    /** The database pool. */
    this.pool = pool;
  }

  /**
   * Fetches a user's data.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  async read(req, res) {
    try {
      const client = await this.pool.connect();

      /** @type {{ jwt: string }} */
      const body = req.body;

      const response = await fetch(process.env.API_SERVER_URL + serverRoute.auth.verifyToken.use(), {
        method: 'POST',
        body: JSON.stringify({ jwt: body.jwt }),
        headers: {
          'content-type': 'application/json'
        }
      })
      /** @type {import('../shared/interfaces/index.js').TokenResponseProps} */
      const result = await response.json();

      if (!result.success) {
        return res.status(200).json({ success: false, message: 'Not authenticated' })
      }

      const fetchAccountQuery = 'SELECT * FROM public.user WHERE id = $1 LIMIT 1;';
      const fetchAccountValues = [result.payload.payload.userID];

      const { rows } = await client.query(fetchAccountQuery, fetchAccountValues);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Fetched account data successfully', data: JSON.stringify(rows[0]) });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }
}

export default AccountEndpoints;
