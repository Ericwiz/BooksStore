import { describe } from "node:test";
import { Book, Bookstore} from "../books";
import supertest from 'supertest'
import app from "../../server"; 

const request = supertest(app)

const books = new Bookstore()

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiQWd1IHdpeiIsImVtYWlsIjoid2l6QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJGVrazV3bUE5ZFpYclc1T1l6NDJQNy5yY2RuYUptWkxoMUlaMUN3WTcwY0l5djFhblBkeDBxIiwiaWQiOjF9LCJpYXQiOjE2NzU1MTkyMjl9.svC60NMiAJfsUKmDSkUo1sJ9Abs6RH731X1_Wxrni-4"

describe("Test For The Books Table Model", ()=>{
    describe("Test to ensure that all method for CRUD exists", ()=>{
        it("expects book to have an index method", ()=>{
            expect(books.index()).toBeDefined()
        })
        
        it("expects show to be defined",async () => {
            expect(books.show).toBeDefined()
        })

        it("expects books to have create method", ()=>{
            expect(books.createBook).toBeDefined()
        })

        it('should have an update method', () => {
            expect(books.update).toBeDefined();
          });

        it("expects books to have delete method", ()=>{
            expect(books.deleteBook).toBeDefined()
        })

        it('create method should add a book', async () => {
            const result = await books.createBook({
              title: 'Bridge to Terabithia',
              type: 'child',
              total_pages: 250,
              author: 'Katherine Paterson',
              summary: 'Childrens'
            });
            expect(result).toEqual({
                // @ts-ignore
              id: 1,
              title: 'Bridge to Terabithia',
              type: 'child',
              total_pages: 250,
              author: 'Katherine Paterson',
              summary: 'Childrens'
            });
        })


  it('index method should return a list of books', async () => {
    const result = await books.index();
    expect(result).toEqual([{
      id: 1,
      title: 'Bridge to Terabithia',
      type: 'child',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens'
    }]);
  });

  it('show method should return the correct book', async () => {
    const result = await books.show("1");
    expect(result).toEqual({
      id: 1,
      title: 'Bridge to Terabithia',
      type: 'child',
      total_pages: 250,
      author: 'Katherine Paterson',
      summary: 'Childrens'
    });
  });

  it('should update book', async () => {
    const book = await books.update({
            id: 1,
            title: 'Rich dad poor dad',
            type: 'lessons',
            total_pages: 250,
            author: 'Paterson',
            summary: 'Childrens Money'
  })
  expect(book).toEqual({
            id: 1,
            title: 'Rich dad poor dad',
            type: 'lessons',
            total_pages: 250,
            author: 'Paterson',
            summary: 'Childrens Money'
  })
})

  it('delete method should remove the book', async () => {
    books.deleteBook("1");
    const result = await books.index()

    expect(result).toEqual([]);
  });

    })

    describe('It should test all Endpoints', () => {
      it('expects /books to be 200', async () => {
        const response = await request.get('/books');
        expect(response.status).toBe(200)
      })

      it('expects /books/:id to be 200', async () => {
        const response = await request.get('/books/1');
        expect(response.status).toBe(200)
      })

      it('expects /books/:id to be 200', async () => {
        const response = await request.get('/books/1').set("Authorization", `Bearer ${token}`)
        expect(response.status).toBe(200)
      })

     it('expects /users/:id to be 200', async () => {
       const response = await request.put('/books/1').set("Authorization", `Bearer ${token}`)
       expect(response.status).toBe(200)
     })

     it('expects /users/:id to be 200', async () => {
       const response = await request.delete('/books/1').set("Authorization", `Bearer ${token}`)
       expect(response.status).toBe(200)
     })
    })
})

