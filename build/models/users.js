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
exports.UserStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not fetch users. Error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id = ($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to get user with id: ${id}. Error: ${error}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                if (process.env.ENV === 'dev') {
                    // @ts-ignore
                    const hash = bcrypt_1.default.hashSync(u.pass + pepper, parseInt(saltRounds));
                    const result = yield conn.query(sql, [u.username, u.email, hash]);
                    conn.release();
                    return result.rows[0];
                }
                const result = yield conn.query(sql, [u.username, u.email, u.pass]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create user ${u.username}, Error: ${error}`);
            }
        });
    }
    update(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE users SET (username, email, password) = ($1, $2, $3) WHERE id = ($4) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                //  @ts-ignore
                if (process.env.ENV === 'dev') {
                    // @ts-ignore
                    const hash = bcrypt_1.default.hashSync(u.pass + pepper, parseInt(saltRounds));
                    const result = yield conn.query(sql, [u.username, u.email, hash, u.id]);
                    conn.release();
                    return result.rows[0];
                }
                else {
                    const result = yield conn.query(sql, [u.username, u.email, u.pass, u.id]);
                    conn.release();
                    return result.rows[0];
                }
            }
            catch (error) {
                throw new Error(`Could not update ${u.username}. Error: ${error}`);
            }
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id = ($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete user with id: ${id}. Error: ${error}`);
            }
        });
    }
    authenticate(pass, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // @ts-ignore 
                const conn = yield database_1.default.connect();
                const sql = 'SELECT password FROM users WHERE username = ($1)';
                const result = yield conn.query(sql, [name]);
                console.log(pass + pepper);
                if (result.rows.length) {
                    const user = result.rows[0];
                    console.log(user);
                    if (bcrypt_1.default.compareSync(pass + pepper, user.password)) {
                        return user;
                    }
                }
                return null;
            }
            catch (error) {
                throw new Error(`${error}`);
            }
        });
    }
}
exports.UserStore = UserStore;
