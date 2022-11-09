import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const pepper=process.env.PEPPER;
const salt:any=process.env.SALT_ROUNDS;

const hash=(password:string):string=>{
   return bcrypt.hashSync(
    password + pepper, 
        parseInt(salt as string)
     );
}

export default hash;