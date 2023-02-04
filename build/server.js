"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const usersRoute_1 = __importDefault(require("./routes/usersRoute"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use(body_parser_1.default.json());
app.use('/books', bookRoutes_1.default);
app.use('/users', usersRoute_1.default);
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send("Hello PG");
});
app.listen(port, () => console.log(`Server started on port ${port}`));
