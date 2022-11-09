import { Router } from 'express'
import { index,Show,addProduct,deleteById,update } from '../controllers/products.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware'

const productsRouter = Router();

productsRouter.get('/',index);
productsRouter.get('/show',Show);
productsRouter.post('/create',verifyAuthToken,addProduct);
productsRouter.delete('/delete',verifyAuthToken,deleteById);
productsRouter.patch('/update',verifyAuthToken,update);

export default productsRouter;
