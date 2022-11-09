import { Router } from 'express'
import { index,Show,create,update } from '../controllers/user.controller';
import verifyAuthToken from '../utilities/middlewares/authToken.middleware'

const usersRouter = Router();

usersRouter.get('/',verifyAuthToken,index);
usersRouter.get('/show',verifyAuthToken,Show);
usersRouter.post('/create',verifyAuthToken,create);
usersRouter.post('/update',verifyAuthToken,update);
export default usersRouter;
