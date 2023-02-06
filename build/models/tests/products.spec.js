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
const products_1 = require("../products");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const products = new products_1.ProductsStore();
(0, node_test_1.describe)("Test For The Books Table Model", () => {
    (0, node_test_1.describe)("Test to ensure that all method for CRUD exists", () => {
        it("expects product to have an index method", () => {
            expect(products.index()).toBeDefined();
        });
        it("expects show to be defined", () => __awaiter(void 0, void 0, void 0, function* () {
            expect(products.show).toBeDefined();
        }));
        it("expects products to have create method", () => {
            expect(products.create).toBeDefined();
        });
        it('should have an update method', () => {
            expect(products.update).toBeDefined();
        });
        it("expects products to have delete method", () => {
            expect(products.deleteProduct).toBeDefined();
        });
        it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products.create({
                name: 'perfume',
                price: 5
            });
            expect(result).toEqual({
                // @ts-ignore
                id: 1,
                name: 'perfume',
                price: 5
            });
        }));
        it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products.index();
            expect(result).toEqual([{
                    id: 1,
                    name: 'perfume',
                    price: 5
                }]);
        }));
        it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield products.show("1");
            expect(result).toEqual({
                id: 1,
                name: 'perfume',
                price: 5
            });
        }));
        it('should update product', () => __awaiter(void 0, void 0, void 0, function* () {
            const product = yield products.update({
                id: 1,
                name: 'book',
                price: 7
            });
            expect(product).toEqual({
                id: 1,
                name: 'book',
                price: 7
            });
        }));
        it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
            yield products.deleteProduct("1");
            const result = yield products.index();
            expect(result).toEqual([]);
        }));
    });
    // describe('It should test all Endpoints', () => {
    //   it('expects /products to be 200', async () => {
    //     const response = await request.get('/products');
    //     expect(response.status).toBe(200)
    //   })
    //   it('expects /products/:id to be 200', async () => {
    //     const response = await request.get('/products/1');
    //     expect(response.status).toBe(200)
    //   })
    //   it('expects /products/:id to be 200', async () => {
    //     const response = await request.get('/products/1')
    //     expect(response.status).toBe(200)
    //   })
    //  it('expects /users/:id to be 200', async () => {
    //    const response = await request.put('/products/1')
    //    expect(response.status).toBe(200)
    //  })
    //  it('expects /users/:id to be 200', async () => {
    //    const response = await request.delete('/products/1')
    //    expect(response.status).toBe(200)
    //  })
    // })
});
