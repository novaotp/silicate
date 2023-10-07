
import pg from 'pg';
import 'dotenv/config'

export default class DBClient {
    constructor() {
        this.client = new pg.Client(process.env.PG_DB_URI);
    }

    async connect() {
        await this.client.connect();
    }

    async disconnect() {
        await this.client.end();
    }

    async query(query, parameters=[], callback=null) {
    	if (callback === null) {
    	  return await this.client.query(query, parameters);
    	  
    	} else {
          return await this.client.query(query, parameters, callback);
        }
    }
}

export class DBPool {
    constructor() {
        this.pool = new pg.Pool({
            host: process.env.PG_DB_HOST,
            user: process.env.PG_DB_USER,
            password: process.env.PG_DB_PASSWORD,
            database: process.env.PG_DB,
            port: process.env.PG_DB_PORT,
        });
    }

    async connect() {
        return await this.pool.connect();
    }

    async disconnect() {
        await this.pool.end();
    }

    async query(query, parameters=[], callback=null) {
        if (callback === null) {
          return await this.pool.query(query, parameters);
          
        } else {
          return await this.pool.query(query, parameters, callback);
        }
    }
}
