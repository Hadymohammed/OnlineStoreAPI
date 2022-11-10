import { Router } from 'express'
import { ShowOrder,addProduct,deleteOrder,deleteProduct, ShowUserOrders } from '../controllers/orderProducts.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware'

const orderProductsRouter = Router();

orderProductsRouter.get('/Products',verifyAuthToken,ShowOrder);
orderProductsRouter.get('/user',verifyAuthToken,ShowUserOrders);
orderProductsRouter.post('/addProduct',verifyAuthToken,addProduct);
orderProductsRouter.delete('/deleteProduct',verifyAuthToken,deleteProduct);

export default orderProductsRouter;
