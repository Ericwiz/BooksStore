import express from "express";
import { index, create } from "../handlers/productsHandler";

const productRoute = express.Router()

productRoute.get('/', index)
productRoute.post('/', create)

export default productRoute;