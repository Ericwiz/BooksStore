import { Request, Response
} from "express";

import { Product, ProductsStore } from "../models/products";
const products = new ProductsStore()
export const index = async(req: Request, res: Response) => {
   try {
       const myOrders = await products.index();
       res.json(myOrders)
   } catch (error) {
       throw new Error(`Could not get products: ${error}`)
   }
}

export const create = async (req:Request, res:Response)=> {
   const newProduct: Product = {
       name: req.body.name,
       price: req.body.price
   }
   try {
       const myProduct = await products.create(newProduct)
       res.json(myProduct)
   } catch (error) {
       throw new Error(`Could not create product: ${error}`)
   }

}