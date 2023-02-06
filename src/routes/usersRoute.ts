import express from 'express';
import { index, create, authenticate, update, show, remove } from '../handlers/usersHandler';

const userRoute = express.Router()

userRoute.get('/', index);
userRoute.post('/', create);
userRoute.get('/:id', show);
userRoute.put('/:id', update);
userRoute.delete('/:id', remove)
userRoute.post('/authenticate', authenticate)
export default userRoute;