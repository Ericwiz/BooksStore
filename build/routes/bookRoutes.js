"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookHandler_1 = require("../handlers/bookHandler");
const bookRoute = express_1.default.Router();
bookRoute.get('/', bookHandler_1.index);
bookRoute.post('/', bookHandler_1.verificationToken, bookHandler_1.createBook);
bookRoute.get('/:id', bookHandler_1.show);
bookRoute.put('/:id', bookHandler_1.verificationToken, bookHandler_1.update);
bookRoute.delete('/:id', bookHandler_1.verificationToken, bookHandler_1.deleteBook);
exports.default = bookRoute;
