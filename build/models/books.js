"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bookstore = void 0;
const process_1 = require("process");
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class Bookstore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM books';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not fetch books error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM books WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(` Unable to get book error: ${error}`);
            }
        });
    }
    createBook(b) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO books (title, author, total_pages, type, summary) VALUES ($1, $2, $3, $4, $5) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create new book Error: ${error}`);
            }
        });
    }
    deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM books WHERE id = ($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not delete book ${id}; Error: ${error}`);
            }
        });
    }
    update(book) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE books SET (title, author, total_pages, type, summary) = ($1, $2, $3, $4, $5) WHERE id = ($6) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [book.title, book.author, book.total_pages, book.type, book.summary, book.id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update book ${process_1.title}: Error: ${error}`);
            }
        });
    }
}
exports.Bookstore = Bookstore;
