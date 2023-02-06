import { describe } from "node:test";
import { Product, ProductsStore
 } from "../products";
import supertest from 'supertest'
import app from "../../server"; 

const request = supertest(app)

const products = new ProductsStore()

describe("Test For The Books Table Model", ()=>{
    describe("Test to ensure that all method for CRUD exists", ()=>{
        it("expects product to have an index method", ()=>{
            expect(products.index()).toBeDefined()
        })
        
        it("expects show to be defined",async () => {
            expect(products.show).toBeDefined()
        })

        it("expects products to have create method", ()=>{
            expect(products.create).toBeDefined()
        })

        it('should have an update method', () => {
            expect(products.update).toBeDefined();
          });

        it("expects products to have delete method", ()=>{
            expect(products.deleteProduct).toBeDefined()
        })

        it('create method should add a product', async () => {
            const result = await products.create({
              name: 'perfume',
              price: 5
            });
            expect(result).toEqual({
                // @ts-ignore
              id: 1,
              name: 'perfume',
              price: 5
            });
        })


  it('index method should return a list of products', async () => {
    const result = await products.index();
    expect(result).toEqual([{
      id: 1,
      name: 'perfume',
      price: 5
    }]);
  });

  it('show method should return the correct product', async () => {
    const result = await products.show("1");
    expect(result).toEqual({
      id: 1,
      name: 'perfume',
      price: 5
    });
  });

  it('should update product', async () => {
    const product = await products.update({
            id: 1,
            name: 'book',
            price: 7
  })
  expect(product).toEqual({
            id: 1,
            name: 'book',
            price: 7
  })
})

it('delete method should remove the product', async () => {
  await products.deleteProduct("1");
  const result = await products.index()

  expect(result).toEqual([]);
});

    })

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
})

