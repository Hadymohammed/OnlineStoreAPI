import { Router } from 'express'
import { ShowOrder,addProduct,deleteOrder,deleteProduct } from '../controllers/orderProducts.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware'

const orderProductsRouter = Router();

orderProductsRouter.get('/orderProducts',verifyAuthToken,ShowOrder);
orderProductsRouter.post('/addProduct',verifyAuthToken,addProduct);
orderProductsRouter.delete('/deleteProduct',verifyAuthToken,deleteProduct);

export default orderProductsRouter;
