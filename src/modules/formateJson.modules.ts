import { Order } from '../models/order.model';
import { orderProduct } from '../models/orderProducts.model';
import { User } from '../models/user.model';

export interface completeOrder {
    order_id: number;
    order_status: string;
    user_id: number;
    user_name: string;
    products: orderProduct[];
}
export interface userOrders {
    user_id: number;
    user_name: string;
    orders: completeOrder[];
}
export interface formatedUser {
    user_id: number;
    user_name: string;
    password?:string;
    token?:string;
}
class formatting {
    completeOrder(rows: any, order: Order, user: User): completeOrder {
        for (const row of rows) {
            delete row.id;
            delete row.user_id;
            delete row.status;
            delete row.order_id;
        }
        const orderInfo: completeOrder = {
            order_id: order.id as number,
            user_id: order.user_id,
            user_name: `${user.first_name} ${user.last_name}`,
            order_status: order.status,
            products: [],
        };
        const products: orderProduct[] = rows;
        orderInfo.products = products;
        return orderInfo;
    }

    userOrders(user: User, orders: completeOrder[]): userOrders {
        const formatedData: userOrders = {
            user_id: user.id as number,
            user_name: `${user.first_name} ${user.last_name}`,
            orders,
        };
        return formatedData;
    }
    user(user: User): formatedUser {
        const formatedData = {
            user_id: user.id as number,
            user_name: `${user.first_name} ${user.last_name}`,
            password:user.password,
            token:user.token
        };
        return formatedData;
    }
}
export default formatting;
