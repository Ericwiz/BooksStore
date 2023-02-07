import express from "express";
import { index, create, addProduct } from "../handlers/ordersHandler";

const orderRoute = express.Router()

orderRoute.get('/', index)
orderRoute.post('/', create)
orderRoute.post('/:id/products', addProduct)

export default orderRoute;