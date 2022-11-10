import { Router } from 'express';
import mainRouter from './api.router';
import productsRouter from './products.router';
import usersRouter from './users.router';
import ordersRouter from './orders.router';
import orderProductsRouter from './orderProducts.router';
const router = Router();

router.use('/', mainRouter);
router.use('/products', productsRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/orders', orderProductsRouter);
export default router;
