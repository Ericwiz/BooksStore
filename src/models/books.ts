import { title } from "process";
// @ts-ignore
import client from "../database";

export type Book = {
    id?: number
    title: string;
    author: string;
    total_pages: number;
    type: string;
    summary: string;
}

export class Bookstore {
    async index(): Promise<Book[]> {
        try {
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM books';
            const result = await conn.query(sql);
            conn.release()
        return result.rows;
        } catch (error) {
            throw new Error(`Could not fetch books error: ${error}`);
            
        }
    }

    async show(id: string): Promise<Book>{
        try{
            // @ts-ignore
            const conn = await client.connect();
            const sql = 'SELECT * FROM books WHERE id = ($1)';
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0]
        }catch (error){
            throw new Error(` Unable to get book error: ${error}`);
            
        }  
    }

    async createBook(b:Book): Promise<Book> {
        try {
            const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *';
            // @ts-ignore
            const conn = await client.connect();
            const result = await conn.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary])
            conn.release()
            
            return result.rows[0]
        } catch (error) {
            throw new Error(`Could not create new book Error: ${error}`);
            
        }

   }

   async deleteBook(id:string): Promise<Book>{
    try {
        // @ts-ignore
        const conn = await client.connect();
        const sql = 'DELETE FROM books WHERE id = ($1)';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0]
    } catch (error) {
        throw new Error(`could not delete book ${id}; Error: ${error}`);
        
    }
   }

   async update(book: Book): Promise<Book> {
    try {
        const sql = 'UPDATE books SET (title, author, total_pages, type, summary) = ($1, $2, $3, $4, $5) WHERE id = ($6) RETURNING *';
        // @ts-ignore
        const conn = await client.connect();
        const result = await conn.query(sql, [book.title, book.author, book.total_pages, book.type, book.summary, book.id])
        conn.release()
        return result.rows[0]
        
    } catch (error) {
        throw new Error(`Could not update book ${title}: Error: ${error}`);
        
    }
   }
}