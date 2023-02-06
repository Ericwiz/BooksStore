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
const users_1 = require("../users");
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const request = (0, supertest_1.default)(server_1.default);
const user = new users_1.UserStore();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWd1IHdpeiIsImVtYWlsIjoid2l6QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGVrazV3bUE5ZFpYclc1T1l6NDJQNy5yY2RuYUptWkxoMUlaMUN3WTcwY0l5djFhblBkeDBxIiwiaWQiOjF9LCJpYXQiOjE2NzU1MTkyMjl9.svC60NMiAJfsUKmDSkUo1sJ9Abs6RH731X1_Wxrni-4";
describe("Test For The Users Table Model", () => {
    describe('Test to ensure that all method for CRUD exists', () => {
        it('expects users index method to be defined', () => {
            expect(user.index).toBeDefined();
        });
        it('expects user show method to be defined', () => {
            expect(user.show).toBeDefined();
        });
        it('expect user create method', () => {
            expect(user.create).toBeDefined();
        });
        it('expect user update method to be defined', () => {
            expect(user.update).toBeDefined();
        });
        it('expects user delete method to be defined', () => {
            expect(user.deleteUser).toBeDefined();
        });
        it("Should Create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
            const newUser = {
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                pass: 'tttt'
            };
            const myUser = yield user.create(newUser);
            expect(myUser).toEqual({
                id: 1,
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'tttt'
            });
        }));
        it('Should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield user.index();
            expect(users).toEqual([{
                    id: 1,
                    username: "Agu Obum",
                    email: "Wisdom@gmail.com",
                    // @ts-ignore
                    password: 'tttt'
                }]);
        }));
        it('should return a single user', () => __awaiter(void 0, void 0, void 0, function* () {
            const singleUser = yield user.show('1');
            expect(singleUser).toEqual({
                id: 1,
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'tttt'
            });
        }));
        it('should update the user', () => __awaiter(void 0, void 0, void 0, function* () {
            const updateUser = {
                id: 1,
                username: "Agu Wisdom",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                pass: 'aaaa'
            };
            const updatedUser = yield user.update(updateUser);
            expect(updatedUser).toEqual({
                // @ts-ignore
                id: 1,
                username: "Agu Wisdom",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'aaaa'
            });
        }));
        it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
            yield user.deleteUser("1");
            const users = yield user.index();
            expect(users).toEqual([]);
        }));
    });
    describe('Endpoint test', () => {
        it('expects /users/ to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/books').set("Authorization", `Bearer ${token}`);
            expect(response.status).toBe(200);
        }));
        it('expects /users to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get('/users');
            expect(response.status).toBe(200);
        }));
        it('expects /users/authenticate to be 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post('/users/authenticate');
            expect(response.status).toBe(200);
        }));
        //   it('expects /books/:id to be 200', async () => {
        //     const response = await request.get('/books/1');
        //     expect(response.status).toBe(200)
        //   })
        //  it('expects /users/:id to be 200', async () => {
        //    const response = await request.put('/users/1').set("Authorization", `Bearer ${token}`)
        //    expect(response.status).toBe(200)
        //  })
        //  it('expects /users/:id to be 200', async () => {
        //    const response = await request.delete('/users/1').set("Authorization", `Bearer ${token}`)
        //    expect(response.status).toBe(200)
        //  })
    });
});
// 
