import { Router } from 'express';
import {
    ShowOrder,
    addProduct,
    deleteOrder,
    deleteProduct,
    ShowUserOrders,
} from '../controllers/orderProducts.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware';

const orderProductsRouter = Router();

orderProductsRouter.get('/products', verifyAuthToken, ShowOrder);
orderProductsRouter.get('/user', verifyAuthToken, ShowUserOrders);
orderProductsRouter.post('/addProduct', verifyAuthToken, addProduct);
orderProductsRouter.delete('/deleteProduct', verifyAuthToken, deleteProduct);
orderProductsRouter.delete('/deleteOrder', verifyAuthToken, deleteOrder);

export default orderProductsRouter;
