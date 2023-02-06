import { describe } from "node:test";
import { Orders,  OrdersStore
 } from "../orders";
import supertest from 'supertest'
import app from "../../server"; 

const request = supertest(app)

const orders = new OrdersStore()

describe("Test For The Orders Table Model", ()=>{
    describe("Test to ensure that all method for CRUD exists", ()=>{
        it("expects orders to have an index method", ()=>{
            expect(orders.index()).toBeDefined()
        })
        
        it("expects show to be defined",async () => {
            expect(orders.show).toBeDefined()
        })

        it("expects orders to have create method", ()=>{
            expect(orders.create).toBeDefined()
        })

        it('should have an update method', () => {
            expect(orders.update).toBeDefined();
          });

        it("expects orders to have delete method", ()=>{
            expect(orders.deleteOrders).toBeDefined()
        })

        it('create method should add a orders', async () => {
            const result = await orders.create({
              status: 'open',
              user_id: '1' 
            });
            expect(result).toEqual({
                // @ts-ignore
              id: 1,
              status: 'open',
              user_id: '1'
            });
        })


  it('index method should return a list of orders', async () => {
    const result = await orders.index();
    expect(result).toEqual([{
      id: 1,
      status: 'open',
        user_id: '1'
    }]);
  });

  it('show method should return the correct orders', async () => {
    const result = await orders.show("1");
    expect(result).toEqual({
      id: 1,
      status: 'open',
      user_id: '1'
    });
  });

  it('should update orders', async () => {
    const order = await orders.update({
            id: 1,
            status: 'closed',
            user_id: '1'
  })
  expect(order).toEqual({
            id: 1,
            status: 'closed',
            user_id: '1'
  })
})

it('delete method should remove the orders', async () => {
  await orders.deleteOrders("1");
  const result = await orders.index()

  expect(result).toEqual([]);

});
// it("Should add new products", async() => {
//     const product = await orders.addProduct(20, "1", "1");
//     expect(product.).toBe(20, "1", "1")
//   })

    })

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
})

