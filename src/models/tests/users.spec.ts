import {User, UserStore } from "../users";
import supertest from "supertest";
import app from "../../server";
const request = supertest(app)

const user = new UserStore();
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWd1IHdpeiIsImVtYWlsIjoid2l6QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGVrazV3bUE5ZFpYclc1T1l6NDJQNy5yY2RuYUptWkxoMUlaMUN3WTcwY0l5djFhblBkeDBxIiwiaWQiOjF9LCJpYXQiOjE2NzU1MTkyMjl9.svC60NMiAJfsUKmDSkUo1sJ9Abs6RH731X1_Wxrni-4"

describe("Test For The Users Table Model", () => {
    describe('Test to ensure that all method for CRUD exists', () => {
        it('expects users index method to be defined', () => {
            expect(user.index).toBeDefined();
        })
    
        it('expects user show method to be defined', () => {
            expect(user.show).toBeDefined()
        });
    
        it('expect user create method', () => {
            expect(user.create).toBeDefined()
        });
    
        it('expect user update method to be defined', () => {
            expect(user.update).toBeDefined()
        });
    
        it('expects user delete method to be defined', () => {
            expect(user.deleteUser).toBeDefined()
        });
    
        it("Should Create a new user", async () => {
    
            const newUser: User = {
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                pass: 'tttt'
            }
    
            const myUser = await user.create(newUser)
            
            expect(myUser).toEqual({
                id: 1,
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'tttt'
            })
        })
    
        it('Should return all users', async () => {
            const users = await user.index();
            expect(users).toEqual([{
                id: 1,
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'tttt'
            }])
        });
    
        it('should return a single user', async () => {
            const singleUser = await user.show('1');
            expect(singleUser).toEqual({
                id: 1,
                username: "Agu Obum",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'tttt'
            })
        });
    
        it('should update the user', async () => {
            const updateUser: User = {
                id: 1,
                username: "Agu Wisdom",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                pass: 'aaaa'
            }
            const updatedUser = await user.update(updateUser)
    
            expect(updatedUser).toEqual({
                // @ts-ignore
                id: 1,
                username: "Agu Wisdom",
                email: "Wisdom@gmail.com",
                // @ts-ignore
                password: 'aaaa'
            })
        });
    
        it('should delete a user', async () => {
            await user.deleteUser("1");
            const users = await user.index()
            expect(users).toEqual([]);
        })
    });

    describe('Endpoint test', () => {

      it('expects /users/ to be 200',
      async () => {
       const response = await request.post('/books').set("Authorization", `Bearer ${token}`)
       expect(response.status).toBe(200)
     })
     it('expects /users to be 200', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(200)
      })
      it('expects /users/authenticate to be 200', async () => {
        const response = await request.post('/users/authenticate');
        expect(response.status).toBe(200)
      })

      it('expects /users/:id to be 200', async () => {
        const response = await request.get('/books/1');
        expect(response.status).toBe(200)
      })

     it('expects /users/:id to be 200', async () => {
       const response = await request.put('/users/1').set("Authorization", `Bearer ${token}`)
       expect(response.status).toBe(200)
     })

     it('expects /users/:id to be 200', async () => {
       const response = await request.delete('/users/1').set("Authorization", `Bearer ${token}`)
       expect(response.status).toBe(200)
     })
    })
})
// 