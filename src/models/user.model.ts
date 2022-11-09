import db from '../providers/database.provider'

export interface User{
    id?:number,
    first_name:string,
    last_name:string,
    password?:string,
    token?:string
}

class userModel{
    async create(user:User):Promise<User>{
        const { rows } = await db.query(
            'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *',
            [user.first_name, user.last_name, user.password]
        );
        return rows[0];
    }
    async showAll():Promise<User[]>{
        const {rows}=await db.query(
            'select (id,first_name,last_name) from users'
        );
        return rows;
    }
}