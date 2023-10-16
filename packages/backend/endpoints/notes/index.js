
import pool from '../../databases/postgres/index.js';

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

      /** @type { import('../shared/interfaces/index.js').AddNoteProps } */
      const body = req.body;

      console.log(body)

      const now = Date.now();
      const newNoteQuery = 'INSERT INTO public.note (user_id, title, content, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING id;';
      const newNoteValues = [body.userID, body.title, body.content, now, now];

      const { rows } = await client.query(newNoteQuery, newNoteValues);

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
  }

  /**
   * Fetches a specific note of a user.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async read(req, res) {
    try {
      const client = await pool.connect();

      /** @type {import('../shared/interfaces/index.js').ReadNoteProps} */
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
  }

  /**
   * Updates an existing note.
   * @param {Express.Request} req The request object
   * @param {Express.Response} res The response object
   */
  static async update(req, res) {
    try {
      const client = await pool.connect();

      /** @type {import('../shared/interfaces/index.js').EditNoteProps} */
      const body = req.body;

      const now = Date.now();
      const updateNoteQuery = 'UPDATE public.note SET title = $1, content = $2, updated_at = $3 WHERE id = $4;';
      const updateNoteValues = [body.title, body.content, now, body.id];

      await client.query(updateNoteQuery, updateNoteValues);

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

      /** @type { import('../shared/interfaces/index.js').RemoveNoteProps } */
      const body = req.body;

      const deleteNoteQuery = 'DELETE FROM public.note WHERE id = $1 AND user_id = $2';
      const deleteNoteValues = [body.id, body.userID];

      await client.query(deleteNoteQuery, deleteNoteValues);

      await client.release(true);

      return res.status(200).json({ success: true, message: 'Removed note successfully' });

    } catch (err) {
      console.error(err);

      return res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }
}

export default NotesEndpoints;
