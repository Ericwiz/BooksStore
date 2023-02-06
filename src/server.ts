import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import bookRoute from "./routes/bookRoutes";
import userRoute from "./routes/usersRoute";

const app: express.Application = express();
dotenv.config()

app.use(bodyParser.json());


app.use('/books', bookRoute)
app.use('/users', userRoute)

const port = process.env.PORT;

app.get('/', (req: Request, res:Response) => {
    res.send("Hello PG")
})

app.listen(port, ()=> console.log(`Server started on port ${port}`))

export default app;