
import pg from 'pg';
import 'dotenv/config';

/** A class for managing Postgres clients. */
class DBPool {
  constructor() {
    this.pool = new pg.Pool({
      host: process.env.PG_DB_HOST,
      user: process.env.PG_DB_USER,
      password: process.env.PG_DB_PASSWORD,
      database: process.env.PG_DB,
      port: process.env.PG_DB_PORT,
    });
  }

  /**
   * Connects to the database and returns a client.
   * @returns {Promise<pg.PoolClient>} The client database.
   */
  async connect() {
    return await this.pool.connect();
  }

  /**
   * Disconnects the client database.
   * @returns {Promise<void>}
   */
  async disconnect() {
    await this.pool.end();
  }
}

export default DBPool;
