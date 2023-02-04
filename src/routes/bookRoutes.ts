import express from 'express';

import { createBook, index, show, deleteBook, update, verificationToken } from '../handlers/bookHandler';

const bookRoute = express.Router();

bookRoute.get('/', index);
bookRoute.post('/', verificationToken, createBook);
bookRoute.get('/:id', show);
bookRoute.put('/:id', verificationToken, update);
bookRoute.delete('/:id',verificationToken, deleteBook)


export default bookRoute;