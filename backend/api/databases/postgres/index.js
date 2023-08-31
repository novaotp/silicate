
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

<<<<<<< HEAD
    async query(query, parameters=[], callback=()=>{}) {
        return await this.client.query(query, parameters, callback);
    }
}
=======
    async query(query, parameters=[], callback=null) {
    	if (callback === null) {
    	  return await this.client.query(query, parameters);
    	  
    	} else {
          return await this.client.query(query, parameters, callback);
        }
    }
}
>>>>>>> d1f5d52d2ebb99cc5d474f8d6bc4c1d82a41ec1e
