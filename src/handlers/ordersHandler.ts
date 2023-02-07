import { Request, Response
 } from "express";

 import { Orders, OrdersStore } from "../models/orders";

 const orders = new OrdersStore()
 export const index = async(req: Request, res: Response) => {
    try {
        const myOrders = await orders.index();
        res.json(myOrders)
    } catch (error) {
        throw new Error(`Could not get orders: ${error}`)
    }
 }

 export const create = async (req:Request, res:Response)=> {
    const newOrder: Orders = {
        status: req.body.status,
        user_id: req.body.user_id
    }
    try {
        
        const myOrder = await orders.create(newOrder)
        res.json(myOrder)
    } catch (error) {
        throw new Error(`Could not create order: ${error}`)
    }

 }

 export const addProduct = async(req: Request, res: Response) => {
    const quantity: number = parseInt(req.body.quantity)
    const orderId: string = req.params.id
    const productId: string = req.body.product_id

    try {
        const addedProduct = await orders.addProduct(quantity, orderId, productId)
        res.json(addedProduct)
    } catch (error) {
        res.json(error)
        throw new Error(`${error}`);
        
    }
 }