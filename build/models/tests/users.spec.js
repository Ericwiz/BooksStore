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
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../users");
const user = new users_1.UserStore();
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
});
// 
