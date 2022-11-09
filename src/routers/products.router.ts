import { Router } from 'express'
import { index,Show,addProduct } from '../controllers/products.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware'

const productsRouter = Router();

productsRouter.get('/',index);
productsRouter.get('/show',Show);
productsRouter.post('/create',verifyAuthToken,addProduct);

export default productsRouter;
