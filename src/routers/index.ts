import { Router } from 'express'
import mainRouter from './api.router'
import productsRouter from './products.router';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware'
const router = Router()

router.use('/', mainRouter);
router.use('/products',productsRouter);

export default router