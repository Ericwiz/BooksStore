import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Book, Bookstore} from "../models/books";

const myBook = new Bookstore()
dotenv.config()

export const createBook = async (req: Request, res: Response) => {
    const book: Book = {
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        type: req.body.type,
        summary: req.body.summary
    }
    try {
        const newBook = await  myBook.createBook(book);
        res.json(newBook) 
    } catch (error) {
        res.json(error)
        throw new Error(`${error}`);
        
        
    }
}

export const index = async(_req: Request, res: Response) => {
    try {
        const displayBooks = await myBook.index();
        res.json(displayBooks)
    } catch (error) {
        res.json(error)
        throw new Error(`${error}`);
        
        
    }
}
export const show = async (req: Request, res: Response) => {
    try {
        const showBook = await myBook.show(req.params.id);
        res.json(showBook)
    } catch (error) {
        res.json(error)
        throw new Error(`${error}`);
    }
}

export const deleteBook = async(req: Request, res: Response) => {
    try {
        await myBook.deleteBook(req.params.id)
        const displayBooks = await myBook.index();
        res.json({message: `book with index: ${req.params.id} has been deleted successfully`, Books: displayBooks})
    } catch (error) {
        res.json(error)
        throw new Error(`${error}`); 
    }
}

export const update = async(req: Request, res: Response) => {
    const updateBook: Book = {
        // @ts-ignore
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        type: req.body.type,
        summary: req.body.summary
    }
    try {
      const updatedBook = await myBook.update(updateBook);
      res.json(updatedBook)
        
    } catch (error) {
        res.json(error)
        throw new Error(`${error}`);
    }
}

// @ts-ignore
export const verificationToken = async (req: Request, _res: Response, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split(' ')[1];
        // @ts-ignore
        jwt.verify(token, process.env.TOKEN_SECRET)

        next()
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}