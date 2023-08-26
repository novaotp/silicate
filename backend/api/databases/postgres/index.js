import pg from 'pg';
import 'dotenv/config'

const client = new pg.Client(process.env.PG_DB_URI);

await client.connect();

export default client;