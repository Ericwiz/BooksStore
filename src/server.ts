import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bookRoute from "./routes/bookRoutes";
import userRoute from "./routes/usersRoute";
import orderRoute from "./routes/oderRoute";
import productRoute from "./routes/productRoute";
import dashboardRoute from "./routes/dashboardRoute";

const app: express.Application = express();
dotenv.config()

app.use(bodyParser.json());


app.use('/books', bookRoute)
app.use('/users', userRoute)
app.use('/orders', orderRoute)
app.use('/products', productRoute)
app.use('/dashboard', dashboardRoute)

const port = process.env.PORT;

app.get('/', (_req: Request, res:Response) => {
    res.send("Hello PG")
})

app.listen(port, ()=> console.log(`Server started on port ${port}`))

export default app;