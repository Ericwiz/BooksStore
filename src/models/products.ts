// @ts-ignore
import client from "../database";

export type Product = {
    id?: number
    name: string,
    price: number,
}

export class ProductsStore {
    async index(): Promise<Product[]> {
        try {
            const sql = 'SELECT * FROM products';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release()
            return result.rows;
        } catch (error) {
            throw new Error(`Could not fetch products. Error: ${error}`);
            
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id = ($1)';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release()
        return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to get Product with id: ${id}. Error: ${error}`);
            
        }
    }
    async create(p: Product): Promise<Product> {
        try {
            const sql = 'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [p.name, p.price]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create Product ${p.name}, Error: ${error}`); 
        }
    }

    async update(p: Product): Promise<Product> {
        try {
            const sql = 'UPDATE products SET (name, price) = ($1, $2) WHERE id = ($3) RETURNING *';
            // @ts-ignore
             const conn = await client.connect();
            //  @ts-ignore
                const result = await conn.query(sql, [p.name, p.price, p.id]);
                conn.release();
                return result.rows[0];
            
        } catch (error) {
            throw new Error(`Could not update ${p.name}. Error: ${error}`);
            
        }
    }

    async deleteProduct(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id = ($1)';
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not delete Product with id: ${id}. Error: ${error}`);
            
        }
    }
}