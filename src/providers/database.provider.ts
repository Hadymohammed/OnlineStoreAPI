import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
const {
    DB_HOST,
    DB_NAME,
    DB_USER,
    DB_PASS,
    DB_NAME_TEST,
    ENV,
  } = process.env

let db;
if(process.env["ENV"] === 'test') {
    db= new Pool({
        user: DB_USER,
        host:  DB_HOST,
        database: DB_NAME,
        password:  DB_PASS,
    });
}

if(process.env["ENV"] === 'test') {
    db= new Pool({
        user: DB_USER,
        host:  DB_HOST,
        database: DB_NAME_TEST,
        password:  DB_PASS,
    });
}


export default db;