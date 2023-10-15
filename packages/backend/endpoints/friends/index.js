
import { Pool } from 'pg';

/**
 * Handles friends endpoints.
 * @class
 */
class FriendsEndpoints {
  /**
   * Creates an instance of FriendsEnpoints.
   * @param {Pool} pool The database pool
   */
	constructor(pool) {
		/** The database pool. */
		this.pool = pool;
	}

  /**
	 * Adds a new friend in the database.
	 * @param {Express.Request} req The request object
	 * @param {Express.Response} res The response object
	 */
  async create(req, res) {
    /** @type { import('../shared/interfaces/index.js').FriendRequestProps } */
    const body = req.body;
  
    try {
      const client = await this.pool.connect();
  
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
  }

  /**
	 * Fetches all the user's friends.
	 * @param {Express.Request} req The request object
	 * @param {Express.Response} res The response object
	 */
  async readAll(req, res) {
    /** @type { import('../shared/interfaces/index.js').AllFriendsRequestProps } */
    const body = req.body;
  
    try {
      const client = await this.pool.connect();
  
      const addFriendQuery = 'SELECT * FROM public.friendship WHERE first_user_id = $1 OR second_user_id = $1;';
  
      const firstUserID = Math.min(body.firstUserID, body.secondUserID);
      const secondUserID = Math.max(body.firstUserID, body.secondUserID);
  
      await client.query(addFriendQuery, [firstUserID, secondUserID]);
  
      await client.release(true);
  
      return res.status(200).json({ success: true, message: 'Friend added successfully' });
  
    } catch (err) {
      console.error(err);
  
      return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  }

  /**
	 * Removes a friend from the user.
	 * @param {Express.Request} req The request object
	 * @param {Express.Response} res The response object
	 */
  async delete(req, res) {
    /** @type { import('../shared/interfaces/index.js').FriendRequestProps } */
    const body = req.body;
  
    try {
      const client = await this.pool.connect();
  
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
  }
}

export default FriendsEndpoints;
