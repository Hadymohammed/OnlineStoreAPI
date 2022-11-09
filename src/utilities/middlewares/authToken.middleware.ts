import { Request,Response} from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const verifyAuthToken = (req: Request, res: Response, next: () => void) => {
    const secret:any=process.env.JWT_SECRET;
    try {
        const authorizationHeader:any = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, secret)

        next()
    } catch (error) {
        res.status(401)
    }
}