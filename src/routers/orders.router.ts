import { Router } from 'express';
import {
    index,
    Show,
    addOdrer,
    deleteById,
    update,
} from '../controllers/orders.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware';

const ordersRouter = Router();

ordersRouter.get('/', verifyAuthToken, index);
ordersRouter.get('/show', verifyAuthToken, Show);
ordersRouter.post('/create', verifyAuthToken, addOdrer);
ordersRouter.delete('/delete', verifyAuthToken, deleteById);
ordersRouter.patch('/update', verifyAuthToken, update);

export default ordersRouter;
