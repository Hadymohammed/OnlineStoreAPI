import { Router } from 'express'
import { index,Show,addProduct } from '../controllers/products.controller';
const productsRouter = Router();

productsRouter.get('/',index);
productsRouter.get('/show',Show);
productsRouter.post('/create',addProduct);

export default productsRouter;
