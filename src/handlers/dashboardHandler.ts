import { dashboardQueries } from "../services/dashboard";
import { Request, Response
 } from "express";
 const dashboard = new dashboardQueries();

export const orderUser = async(req: Request, res: Response) => {
    try {
        const orderInUser = await dashboard.orderUsersJoin()
        res.json(orderInUser)
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}

export const topFiveProduct = async(_req: Request, res: Response) => {
    try {
        const products = await dashboard.ProductWithHighestPriceTag()
        res.json(products)
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}