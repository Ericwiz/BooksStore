import { orderUser, topFiveProduct } from "../handlers/dashboardHandler";
import express from 'express';

const dashboardRoute = express.Router()

dashboardRoute.get('/order_in_user', orderUser);
dashboardRoute.get('/top_five_products', topFiveProduct);


export default dashboardRoute;