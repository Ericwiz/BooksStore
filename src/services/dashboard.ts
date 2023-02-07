// @ts-ignore
import client from "../database";

export class  dashboardQueries{
    async orderUsersJoin(): Promise<{username: string, status: number, user_id: string}[]>  {
        try {
            // @ts-ignore
        const conn = await client.connect();
        const sql = 'SELECT username, status, user_id FROM orders INNER JOIN users ON orders.id = users.id';
        const result = await conn.query(sql);
        conn.release();
        return result.rows
        } catch (error) {
            throw new Error(`${error}`);
            
        }
    }

    async ProductWithHighestPriceTag(): Promise<{name: string, price: number}[]>  {
        try {
            // @ts-ignore
        const conn = await client.connect();
        const sql = 'SELECT * FROM products ORDER BY price DESC lIMIT 5';
        const result = await conn.query(sql);
        conn.release();
        return result.rows
        } catch (error) {
            throw new Error(`${error}`);
            
        }
    }
}