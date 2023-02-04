"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_USER, POSTGRES_DB, POSTGRES_HOST, POSTGRES_PASSWORD, POSTGRES_TEST_PASSWORD, POSTGRES_TEST_DB, POSTGRES_TEST_USER, ENV } = process.env;
let client;
console.log(ENV);
if (ENV === "dev") {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB
    });
}
if (ENV === "test") {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_TEST_USER,
        password: POSTGRES_TEST_PASSWORD,
        database: POSTGRES_TEST_DB,
    });
}
exports.default = client;
