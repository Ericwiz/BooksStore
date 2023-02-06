import { Request, Response } from "express"; 
import { UserStore, User } from "../models/users";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config()
const user = new UserStore()

export const index = async(_req: Request, res: Response) => {
    try {
        const myUsers = await user.index();
        res.json(myUsers);
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}

export const create = async(req: Request, res: Response) => {
    const myUser: User = {
        username: req.body.username,
        email: req.body.email,
        pass: req.body.password
    }
    try {
        const newUser = await user.create(myUser)
        // @ts-ignore
        const token = jwt.sign({user: newUser}, process.env.TOKEN_SECRET)
        res.json(token)
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}

export const show = async(req: Request, res:Response) => {
    try {
        const myUser = await user.show(req.params.id);
        res.json(myUser)
    } catch (error) {
       throw new Error(`${error}`); 
    }
}

export const update = async (req: Request, res: Response) => {
    const myUser: User = {
    // @ts-ignore
    id: req.params.id,
    email: req.body.email,
    username: req.body.username,
    pass: req.body.password
        }
    try {
        const updatedUser = await user.update(myUser)
        res.json(updatedUser)
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        await user.deleteUser(req.params.id);
        const myUser = await user.index()
        res.json(`Deleted user successfully. ${myUser}`)
    } catch (error) {
        throw new Error(`${error}`)
    }
}

export const authenticate = async(req: Request, res: Response) => {
    try {
        const myUser = await user.authenticate(req.body.pass, req.body.name)
        res.json(myUser)
    } catch (error) {
        throw new Error(`${error}`);
        
    }
}