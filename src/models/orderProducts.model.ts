import formatting, {
    completeOrder,
    userOrders,
} from '../modules/formateJson.modules';
import db from '../providers/database.provider';
import ordersModel, { Order } from './order.model';
import { User } from './user.model';

export interface orderProduct {
    id?: number;
    order_id: number;
    product_id: number;
    name?:string,
    price?:number,
    quantity?: number;
}
const formate = new formatting();
const orderEntity = new ordersModel();
class OrderProductsModel {
    async showAll(): Promise<orderProduct[]> {
        const { rows } = await db.query(
            'select (orders.id,products.name,products.price,order_products.quantity) from orders join order_products on orders.id=order_products.order_id join products on products.id=order_products.product_id'
        );
        return rows;
    }

    async showByOrder(order: Order): Promise<completeOrder> {
        const { rows } = await db.query(
            'select * from orders join order_products on orders.id=order_products.order_id join products on products.id=order_products.product_id where orders.id=$1',
            [order.id]
        );

        const orderInfo: completeOrder = formate.completeOrder(rows, order);
        return orderInfo;
    }

    async showUserOrders(user: User): Promise<userOrders> {
        const orders = await orderEntity.getByUserId(user.id as number);
        const completeOrders: completeOrder[] = [];
        for (const order of orders) {
            completeOrders.push(await this.showByOrder(order));
        }
        const userOrder: userOrders = formate.userOrders(user, completeOrders);
        return userOrder;
    }

    async addProduct(product: orderProduct): Promise<orderProduct> {
        const { rows } = await db.query(
            'insert into order_products(order_id,product_id,quantity)  values ($1,$2,$3) RETURNING *',
            [product.order_id, product.product_id, product.quantity]
        );
        return rows[0];
    }

    async deleteProduct(
        product_id: number,
        order_id: number
    ): Promise<orderProduct> {
        const { rows } = await db.query(
            'delete from order_products where order_id=$1 and product_id=$2 RETURNING *',
            [order_id,product_id]
        );
        return rows[0];
    }

    async deleteOrder(order_id: number): Promise<orderProduct[]> {
        const { rows } = await db.query(
            'delete from order_products where order_id=$1 RETURNING *',
            [order_id]
        );
        return rows;
    }
}

export default OrderProductsModel;
