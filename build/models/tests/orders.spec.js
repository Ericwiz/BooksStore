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
const orders_1 = require("../orders");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const orders = new orders_1.OrdersStore();
(0, node_test_1.describe)("Test For The Orders Table Model", () => {
    (0, node_test_1.describe)("Test to ensure that all method for CRUD exists", () => {
        it("expects orders to have an index method", () => {
            expect(orders.index()).toBeDefined();
        });
        it("expects show to be defined", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(orders.show).toBeDefined();
        }));
        it("expects orders to have create method", () => {
            expect(orders.create).toBeDefined();
        });
        it('should have an update method', () => {
            expect(orders.update).toBeDefined();
        });
        it("expects orders to have delete method", () => {
            expect(orders.deleteOrders).toBeDefined();
        });
        it('create method should add a orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orders.create({
                status: 'open',
                user_id: '1'
            });
            expect(result).toEqual({
                // @ts-ignore
                id: 1,
                status: 'open',
                user_id: '1'
            });
        }));
        it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orders.index();
            expect(result).toEqual([{
                    id: 1,
                    status: 'open',
                    user_id: '1'
                }]);
        }));
        it('show method should return the correct orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orders.show("1");
            expect(result).toEqual({
                id: 1,
                status: 'open',
                user_id: '1'
            });
        }));
        it('should update orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const order = yield orders.update({
                id: 1,
                status: 'closed',
                user_id: '1'
            });
            expect(order).toEqual({
                id: 1,
                status: 'closed',
                user_id: '1'
            });
        }));
        it('delete method should remove the orders', () => __awaiter(void 0, void 0, void 0, function* () {
            yield orders.deleteOrders("1");
            const result = yield orders.index();
            expect(result).toEqual([]);
        }));
        // it("Should add new products", async() => {
        //     const product = await orders.addProduct(20, "1", "1");
        //     expect(product.).toBe(20, "1", "1")
        //   })
    });
    // describe('addProduct', () => {
    //     it('should add a product to the order and return the updated order', async () => {
    //       const result = await orders.addProduct(2, 'order1', 'product1');
    //       expect(result.).toEqual(2);
    //       expect(result.product_id).toEqual('product1');
    //       expect(result.order_id).toEqual('order1');
    //     });
    //     it('should throw an error if the product could not be added to the order', async () => {
    //       try {
    //         await addProduct(0, '', 'product2');
    //         fail();
    //       } catch (error) {
    //         expect(error.message).toEqual('Could not add product product2 to order , Error: ...');
    //       }
    //     });
    //   });
    // describe('It should test all Endpoints', () => {
    //   it('expects /orders to be 200', async () => {
    //     const response = await request.get('/orders');
    //     expect(response.status).toBe(200)
    //   })
    //   it('expects /orders/:id to be 200', async () => {
    //     const response = await request.get('/orders/1');
    //     expect(response.status).toBe(200)
    //   })
    //   it('expects /orders/:id to be 200', async () => {
    //     const response = await request.get('/orders/1')
    //     expect(response.status).toBe(200)
    //   })
    //  it('expects /users/:id to be 200', async () => {
    //    const response = await request.put('/orders/1')
    //    expect(response.status).toBe(200)
    //  })
    //  it('expects /users/:id to be 200', async () => {
    //    const response = await request.delete('/orders/1')
    //    expect(response.status).toBe(200)
    //  })
    // })
});
