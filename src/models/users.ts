// @ts-ignore
import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config()

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
    id?: number
    username: string,
    email: string,
    pass: string,
}

export class UserStore {
    async index(): Promise<User[]> {
        try {
            const sql = 'SELECT * FROM users';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release()
            return result.rows;
        } catch (error) {
            throw new Error(`Could not fetch users. Error: ${error}`);
            
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = 'SELECT * FROM users WHERE id = ($1)';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release()
        return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to get user with id: ${id}. Error: ${error}`);
            
        }
    }
    async create(u: User): Promise<User> {
        try {
            const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();
            
            if(process.env.ENV === 'dev') {
               // @ts-ignore
                const hash = bcrypt.hashSync(u.pass + pepper, parseInt(saltRounds))
                const result = await conn.query(sql, [u.username, u.email, hash]);
                conn.release();
                return result.rows[0]; 
            }
            
            
            const result = await conn.query(sql, [u.username, u.email, u.pass]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create user ${u.username}, Error: ${error}`); 
        }
    }

    async update(u: User): Promise<User> {
        try {
            const sql = 'UPDATE users SET (username, email, password) = ($1, $2, $3) WHERE id = ($4) RETURNING *';
            // @ts-ignore
             const conn = await client.connect();
            //  @ts-ignore
            if(process.env.ENV === 'dev') {
                // @ts-ignore
                const hash = bcrypt.hashSync(u.pass + pepper, parseInt(saltRounds))
                const result = await conn.query(sql, [u.username, u.email, hash, u.id]);
                conn.release();
                return result.rows[0];
            }else {
                const result = await conn.query(sql, [u.username, u.email, u.pass, u.id]);
                conn.release();
                return result.rows[0];
            }
        } catch (error) {
            throw new Error(`Could not update ${u.username}. Error: ${error}`);
            
        }
    }

    async deleteUser(id: string): Promise<User> {
        try {
            const sql = 'DELETE FROM users WHERE id = ($1)'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not delete user with id: ${id}. Error: ${error}`);
            
        }
    }

    async authenticate(pass: string, name: string): Promise<User | null> {
        try {
            // @ts-ignore 
        const conn = await client.connect();
        const sql = 'SELECT password FROM users WHERE username = ($1)';
        const result = await conn.query(sql, [name])

        if(result.rows.length) {
            const user = result.rows[0]

            console.log(user)

            if(bcrypt.compareSync(pass+pepper, user.password)) {
                return user
            }
        }
        return null
        } catch (error) {
            throw new Error(`${error}`);
            
        }
    }
}