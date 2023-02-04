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
exports.verificationToken = exports.update = exports.deleteBook = exports.show = exports.index = exports.createBook = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const books_1 = require("../models/books");
const myBook = new books_1.Bookstore();
dotenv_1.default.config();
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = {
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        type: req.body.type,
        summary: req.body.summary
    };
    try {
        const newBook = yield myBook.createBook(book);
        res.json(newBook);
    }
    catch (error) {
        res.json(error);
        throw new Error(`${error}`);
    }
});
exports.createBook = createBook;
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const displayBooks = yield myBook.index();
        res.json(displayBooks);
    }
    catch (error) {
        res.json(error);
        throw new Error(`${error}`);
    }
});
exports.index = index;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const showBook = yield myBook.show(req.params.id);
        res.json(showBook);
    }
    catch (error) {
        res.json(error);
        throw new Error(`${error}`);
    }
});
exports.show = show;
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield myBook.deleteBook(req.params.id);
        const displayBooks = yield myBook.index();
        res.json({ message: `book with index: ${req.params.id} has been deleted successfully`, Books: displayBooks });
    }
    catch (error) {
        res.json(error);
        throw new Error(`${error}`);
    }
});
exports.deleteBook = deleteBook;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updateBook = {
        // @ts-ignore
        id: req.params.id,
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        type: req.body.type,
        summary: req.body.summary
    };
    try {
        const updatedBook = yield myBook.update(updateBook);
        res.json(updatedBook);
    }
    catch (error) {
        res.json(error);
        throw new Error(`${error}`);
    }
});
exports.update = update;
// @ts-ignore
const verificationToken = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader === null || authorizationHeader === void 0 ? void 0 : authorizationHeader.split(' ')[1];
        // @ts-ignore
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.verificationToken = verificationToken;
