import { Router } from 'express'
import mainRouter from './api.router'
import productsRouter from './products.router';
const router = Router()

router.use('/', mainRouter);
router.use('/products',productsRouter);

export default router