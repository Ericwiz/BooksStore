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
exports.authenticate = exports.remove = exports.update = exports.show = exports.create = exports.index = void 0;
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const user = new users_1.UserStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUsers = yield user.index();
        res.json(myUsers);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.index = index;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = {
        username: req.body.username,
        email: req.body.email,
        pass: req.body.password
    };
    try {
        const newUser = yield user.create(myUser);
        // @ts-ignore
        const token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json(token);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.create = create;
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield user.show(req.params.id);
        res.json(myUser);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.show = show;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const myUser = {
        // @ts-ignore
        id: req.params.id,
        email: req.body.email,
        username: req.body.username,
        pass: req.body.password
    };
    try {
        const updatedUser = yield user.update(myUser);
        res.json(updatedUser);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user.deleteUser(req.params.id);
        const myUser = yield user.index();
        res.json(`Deleted user successfully. ${myUser}`);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.remove = remove;
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const myUser = yield user.authenticate(req.body.pass, req.body.name);
        res.json(myUser);
    }
    catch (error) {
        throw new Error(`${error}`);
    }
});
exports.authenticate = authenticate;
