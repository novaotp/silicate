
import pool from '../../databases/postgres/index.js';
import getUserIdFromCookie from '../../utils/getUserIdFromCookie/index.js';

/**
 * Handles notes endpoints.
 * @class
 */
class NotesEndpoints {
  /** Adds a new note in the database.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async create(req, res) {
    try {
      const client = await pool.connect();

      /** @type { import('../../../shared/interfaces/index.js').CreateNoteRequestProps } */
      const body = req.body;

      const { userId, message } = await getUserIdFromCookie(req);

      console.log("User ID:", userId);

      if (userId === 0) {
        return res.status(401).json({ success: false, message: message });
      }

      const now = Date.now();
      const query = 'INSERT INTO public.note (user_id, title, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
      const values = [userId, body.title, body.content, now, now];

      const { rows } = await client.query(query, values);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Added note successfully', noteId: rows[0].id });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }

  /**
   * Fetches all the user's notes.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async readAll(req, res) {
    try {
      const client = await pool.connect();

      const { userId, message } = await getUserIdFromCookie(req);

      if (userId === 0) {
        return res.status(401).json({ success: false, message: message });
      }

      const query = 'SELECT * FROM public.note WHERE user_id = $1;';
      const values = [userId];

      const { rows } = await client.query(query, values);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Fetched notes successfully', notes: rows });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }

  /**
   * Fetches a specific note of a user.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async read(req, res) {
    try {
      const client = await pool.connect();

      const { noteId } = req.params;
      const { userId, message } = await getUserIdFromCookie(req);

      if (userId === 0) {
        return res.status(401).json({ success: false, message: message });
      }

      const fetchNoteQuery = 'SELECT * FROM public.note WHERE id = $1 AND user_id = $2 LIMIT 1;';
      const fetchNoteValues = [noteId, userId];

      const { rows } = await client.query(fetchNoteQuery, fetchNoteValues);

      if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Note not found' });
      }

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Fetched notes successfully', note: rows[0] });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }

  /**
   * Updates an existing note.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async update(req, res) {
    try {
      const client = await pool.connect();

      /** @type {import('../../../shared/interfaces/index.js').UpdateNoteRequestProps} */
      const body = req.body;

      const { noteId } = req.params;
      const { userId, message } = await getUserIdFromCookie(req);

      if (userId === 0) {
        return res.status(401).json({ success: false, message: message });
      }

      const now = Date.now();
      const query = 'UPDATE public.note SET title = $1, content = $2, updated_at = $3 WHERE id = $4 AND user_id = $5;';
      const values = [body.title, body.content, now, noteId, userId];

      await client.query(query, values);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Updated note successfully' });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }

  /**
   * Removes a note from the user.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async delete(req, res) {
    try {
      const client = await pool.connect();

      const { noteId } = req.params;
      const { userId, message } = await getUserIdFromCookie(req);

      if (userId === 0) {
        return res.status(401).json({ success: false, message: message });
      }

      const query = 'DELETE FROM public.note WHERE id = $1 AND user_id = $2';
      const values = [noteId, userId];

      await client.query(query, values);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Removed note successfully' });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }
}

export default NotesEndpoints;
