"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersHandler_1 = require("../handlers/usersHandler");
const userRoute = express_1.default.Router();
userRoute.get('/', usersHandler_1.index);
userRoute.post('/', usersHandler_1.create);
userRoute.post('/authenticate', usersHandler_1.authenticate);
exports.default = userRoute;
