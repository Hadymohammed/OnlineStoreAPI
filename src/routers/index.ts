import { Router } from 'express'
import mainRouter from './api.router'

const router = Router()

router.use('/', mainRouter);


export default router