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
const node_test_1 = require("node:test");
const books_1 = require("../books");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const books = new books_1.Bookstore();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWd1IHdpeiIsImVtYWlsIjoid2l6QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGVrazV3bUE5ZFpYclc1T1l6NDJQNy5yY2RuYUptWkxoMUlaMUN3WTcwY0l5djFhblBkeDBxIiwiaWQiOjF9LCJpYXQiOjE2NzU1MTkyMjl9.svC60NMiAJfsUKmDSkUo1sJ9Abs6RH731X1_Wxrni-4";
(0, node_test_1.describe)("Test For The Books Table Model", () => {
    (0, node_test_1.describe)("Test to ensure that all method for CRUD exists", () => {
        it("expects book to have an index method", () => {
            expect(books.index()).toBeDefined();
        });
        it("expects show to be defined", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(books.show).toBeDefined();
        }));
        it("expects books to have create method", () => {
            expect(books.createBook).toBeDefined();
        });
        it('should have an update method', () => {
            expect(books.update).toBeDefined();
        });
        it("expects books to have delete method", () => {
            expect(books.deleteBook).toBeDefined();
        });
        it('create method should add a book', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield books.createBook({
                title: 'Bridge to Terabithia',
                type: 'child',
                total_pages: 250,
                author: 'Katherine Paterson',
                summary: 'Childrens'
            });
            expect(result).toEqual({
                // @ts-ignore
                id: 1,
                title: 'Bridge to Terabithia',
                type: 'child',
                total_pages: 250,
                author: 'Katherine Paterson',
                summary: 'Childrens'
            });
        }));
        it('index method should return a list of books', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield books.index();
            expect(result).toEqual([{
                    id: 1,
                    title: 'Bridge to Terabithia',
                    type: 'child',
                    total_pages: 250,
                    author: 'Katherine Paterson',
                    summary: 'Childrens'
                }]);
        }));
        it('show method should return the correct book', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield books.show("1");
            expect(result).toEqual({
                id: 1,
                title: 'Bridge to Terabithia',
                type: 'child',
                total_pages: 250,
                author: 'Katherine Paterson',
                summary: 'Childrens'
            });
        }));
        it('should update book', () => __awaiter(void 0, void 0, void 0, function* () {
            const book = yield books.update({
                id: 1,
                title: 'Rich dad poor dad',
                type: 'lessons',
                total_pages: 250,
                author: 'Paterson',
                summary: 'Childrens Money'
            });
            expect(book).toEqual({
                id: 1,
                title: 'Rich dad poor dad',
                type: 'lessons',
                total_pages: 250,
                author: 'Paterson',
                summary: 'Childrens Money'
            });
        }));
        it('delete method should remove the book', () => __awaiter(void 0, void 0, void 0, function* () {
            yield books.deleteBook("1");
            const result = yield books.index();
            expect(result).toEqual([]);
        }));
    });
    (0, node_test_1.describe)('It should test all Endpoints', () => {
        it('expects /books to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/books');
            expect(response.status).toBe(200);
        }));
        it('expects /books/:id to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/books/1');
            expect(response.status).toBe(200);
        }));
        it('expects /books/:id to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/books/1').set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('expects /users/:id to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put('/books/1').set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('expects /users/:id to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete('/books/1').set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
    });
});
