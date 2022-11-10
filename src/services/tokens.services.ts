import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/user.model';

dotenv.config();
const generateToken = (user: User): string => {
    const secret: any = process.env.JWT_SECRET;
    return jwt.sign({ sub: user.id }, secret);
};
export default generateToken;
