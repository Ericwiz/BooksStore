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
exports.OrdersStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
class OrdersStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not fetch Orderss. Error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id = ($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Unable to get Orders with id: ${id}. Error: ${error}`);
            }
        });
    }
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO orders (status, user_id) VALUES ($1, $2) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [order.status, order.user_id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not create Orders ${order.status}, Error: ${error}`);
            }
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'UPDATE orders SET (status, user_id) = ($1, $2) WHERE id = ($3) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                //  @ts-ignore
                const result = yield conn.query(sql, [order.status, order.user_id, order.id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not update ${order.status}. Error: ${error}`);
            }
        });
    }
    deleteOrders(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM orders WHERE id = ($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete Orders with id: ${id}. Error: ${error}`);
            }
        });
    }
    addProduct(qauntity, orderId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'INSERT INTO order_products (quantity, product_id, order_id) VALUES($1, $2, $3) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = conn.query(sql, [qauntity, productId, orderId]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not add product ${productId} to order ${orderId}, Error: ${error}`);
            }
        });
    }
}
exports.OrdersStore = OrdersStore;
