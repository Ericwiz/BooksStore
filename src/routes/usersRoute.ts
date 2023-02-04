import express from 'express';
import { index, create, authenticate } from '../handlers/usersHandler';

const userRoute = express.Router()

userRoute.get('/', index);
userRoute.post('/', create);
userRoute.post('/authenticate', authenticate)
export default userRoute;