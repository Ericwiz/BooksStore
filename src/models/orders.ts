// @ts-ignore
import client from "../database";

export type Orders = {
    id?: number
    status: string,
    user_id: string,
}

export class OrdersStore {
    async index(): Promise<Orders[]> {
        try {
            const sql = 'SELECT * FROM orders';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release()
            return result.rows;
        } catch (error) {
            throw new Error(`Could not fetch Orderss. Error: ${error}`);
            
        }
    }

    async show(id: string): Promise<Orders> {
        try {
            const sql = 'SELECT * FROM orders WHERE id = ($1)';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [id]);
            conn.release()
        return result.rows[0];
        } catch (error) {
            throw new Error(`Unable to get Orders with id: ${id}. Error: ${error}`);
            
        }
    }
    async create(order: Orders): Promise<Orders> {
        try {
            const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [order.status, order.user_id]);
            conn.release();
            return result.rows[0];
        } catch (error) {
            throw new Error(`Could not create Orders ${order.status}, Error: ${error}`); 
        }
    }

    async update(order: Orders): Promise<Orders> {
        try {
            const sql = 'UPDATE orders SET (status, user_id) = ($1, $2) WHERE id = ($3) RETURNING *';
            // @ts-ignore
             const conn = await client.connect();
            //  @ts-ignore
                const result = await conn.query(sql, [order.status, order.user_id,  order.id]);
                conn.release();
                return result.rows[0];
            
        } catch (error) {
            throw new Error(`Could not update ${order.status}. Error: ${error}`);
            
        }
    }

    async deleteOrders(id: string): Promise<Orders> {
        try {
            const sql = 'DELETE FROM orders WHERE id = ($1)'
            // @ts-ignore
            const conn = await client.connect()
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not delete Orders with id: ${id}. Error: ${error}`);
            
        }
    }

    async addProduct(quantity: number, orderId: string, productId: string): Promise<Orders> {
        try {
            const sql = 'INSERT INTO order_products (quantity, product_id, orders_id) VALUES($1, $2, $3) RETURNING *'

            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [quantity, productId, orderId]);
            conn.release()
            return result.rows[0]
        
        } catch (error) {
            throw new Error(`Could not add product ${productId} to order r: ${error}`);
        }
    }
}