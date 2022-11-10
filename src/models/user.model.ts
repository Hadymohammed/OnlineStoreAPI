import db from '../providers/database.provider';

export interface User {
    id?: number;
    first_name: string;
    last_name: string;
    password?: string;
    token?: string;
}

class UserModel {
    async create(user: User): Promise<User> {
        const { rows } = await db.query(
            'INSERT INTO users (first_name, last_name, password) VALUES ($1, $2, $3) RETURNING *',
            [user.first_name, user.last_name, user.password]
        );
        delete rows[0].password;
        return rows[0];
    }

    async showAll(): Promise<User[]> {
        const { rows } = await db.query(
            'select (id,first_name,last_name) from users'
        );
        return rows;
    }

    async getById(id: number): Promise<User> {
        const { rows } = await db.query('select * from users where id=$1', [
            id,
        ]);
        return rows[0];
    }

    async deleteById(id: number): Promise<User> {
        const { rows } = await db.query(
            'delete from users where id=$1 RETURNING *',
            [id]
        );
        return rows[0];
    }

    async update(user: User): Promise<User> {
        try {
            // valid id
            const { rows } = await db.query(
                'update users set first_name=$2 , last_name=$3 , password=$4 where id=$1 RETURNING *',
                [user.id, user.first_name, user.last_name, user.password]
            );
            delete rows[0].password;
            return rows[0];
        } catch (err) {
            throw Error('invalid id' + err);
        }
        return user;
    }
}

export default UserModel;
