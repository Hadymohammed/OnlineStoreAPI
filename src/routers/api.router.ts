import { Router } from 'express'

const mainRouter = Router();

mainRouter.get('/', (req, res) => {
    res.send('Hello World From main route!')
})

export default mainRouter;
