
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
