import { Router } from 'express';
import {
    index,
    Show,
    create,
    deleteUser,
    update,
} from '../controllers/user.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware';

const usersRouter = Router();

usersRouter.get('/', verifyAuthToken, index);
usersRouter.get('/show', verifyAuthToken, Show);
usersRouter.post('/create', verifyAuthToken, create);
usersRouter.patch('/update', verifyAuthToken, update);
usersRouter.delete('/delete', verifyAuthToken, deleteUser);
export default usersRouter;
