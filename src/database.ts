import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
    POSTGRES_USER,
    POSTGRES_DB,
    POSTGRES_HOST,
    POSTGRES_PASSWORD,
    POSTGRES_TEST_PASSWORD,
    POSTGRES_TEST_DB,
    POSTGRES_TEST_USER,
    ENV
}= process.env

let client

console.log(ENV)

if(ENV === "dev") {
    client = new Pool ({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB 
    })
}

if(ENV === "test") {
    client = new Pool ({
        host: POSTGRES_HOST,
        user: POSTGRES_TEST_USER,
        password: POSTGRES_TEST_PASSWORD,
        database: POSTGRES_TEST_DB,
    })
}

export default client;