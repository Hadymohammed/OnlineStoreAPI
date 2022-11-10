import db from '../providers/database.provider';

export interface Order {
    id?: number;
    status: string;
    user_id: number;
}

class OrdersModel {
    async showAll(): Promise<Order[]> {
        const { rows } = await db.query('select * from orders;');
        return rows;
    }

    async getByOrderId(id: number): Promise<Order> {
        const { rows } = await db.query('select * from orders where id=$1;', [
            id,
        ]);
        return rows[0];
    }

    async getByUserId(id: number): Promise<Order[]> {
        const { rows } = await db.query(
            'select * from orders where user_id=$1;',
            [id]
        );
        return rows;
    }

    async create(order: Order): Promise<Order> {
        const { rows } = await db.query(
            'INSERT INTO orders (user_id,status) VALUES ($1, $2) RETURNING *',
            [order.user_id, order.status]
        );
        return rows[0];
    }

    async deleteById(id: number): Promise<Order> {
        const { rows } = await db.query(
            'delete from orders where id=$1 RETURNING *',
            [id]
        );
        return rows[0];
    }

    async update(order: Order): Promise<Order> {
        try {
            const { rows } = await db.query(
                'update orders set user_id=$2 , status=$3 where id=$1 RETURNING *',
                [order.id, order.user_id, order.status]
            );
            return rows[0];
        } catch (err) {
            throw Error('invalid : ' + err);
        }
        return order;
    }
}

export default OrdersModel;
