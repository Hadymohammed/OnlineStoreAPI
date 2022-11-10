import db from '../providers/database.provider'
import { Order } from './order.model';
import { Product } from './product.model';

export interface orderProduct{
    id?:number,
    order_id:number,
    product_id:number,
    quantity?:number
}
export interface completeOrder{
    order_id:number,
    order_status:string,
    products:orderProduct[],
}

class orderProductsModel{
    async showAll():Promise<orderProduct[]>{
        const {rows}=await db.query(
            'select (orders.id,products.name,products.price,order_products.quantity) from orders join order_products on orders.id=order_products.order_id join products on products.id=order_products.product_id'
        );
        return rows;
    }
    async showByOrder(order:Order):Promise<completeOrder>{
        const {rows}=await db.query(
            'select * from orders join order_products on orders.id=order_products.order_id join products on products.id=order_products.product_id where orders.id=$1',
            [order.id]
        );
        for (const row of rows) {
            delete row.id;
            delete row.user_id;
            delete row.status;
            delete row.order_id;
        }
        const orderInfo:completeOrder={
            order_id:order.id as number,
            order_status:order.status,
            products:[]
        }
        const products:orderProduct[]=rows;
        orderInfo.products=products;
        return orderInfo;
    }
    async addProduct(product:orderProduct):Promise<orderProduct>{
            const {rows}=await db.query(
                'insert into order_products(order_id,product_id,quantity)  values ($1,$2,$3) RETURNING *',
                [product.order_id,product.product_id,product.quantity]
            );
            return rows[0];
    }
    async deleteProduct(product_id:number,order_id:number):Promise<orderProduct>{
        const {rows}=await db.query(
            'delete from order_products where order_id=$1 and product_id=$2 RETURNING *',
            [product_id,order_id]
        );
        return rows[0];
    }
    async deleteOrder(order_id:number):Promise<orderProduct[]>{
        const {rows}=await db.query(
            'delete from order_products where order_id=$1 RETURNING *',
            [order_id]
        );
        return rows[0];
    }

}

export default orderProductsModel;