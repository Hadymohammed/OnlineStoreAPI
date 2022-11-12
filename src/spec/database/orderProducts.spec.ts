import OrdersModel, { Order } from '../../models/order.model';
import OrderProductsModel from '../../models/orderProducts.model';
import ProductModel, { Product } from '../../models/product.model';
import UserModel, { User } from '../../models/user.model';
import { completeOrder, userOrders } from '../../modules/formateJson.modules';

const OrderProductEntity = new OrderProductsModel();
const UserEntity = new UserModel();
const orderEntity = new OrdersModel();
const ProductEntity = new ProductModel();

const user: User = {
    first_name: 'Mohamed',
    last_name: 'Saed',
    password: '123456',
};
const order: Order = {
    user_id: 0,
    status: 'active',
};
const product: Product = {
    name: 'sheet',
    price: 2,
};
const productQuantity = 5;
describe('OrderProduct Model testing suit', () => {
    beforeAll(async () => {
        //create user
        const dbuser = await UserEntity.create(user);
        user.id = dbuser.id as number;
        order.user_id = user.id as number;

        //create order
        const dborder = await orderEntity.create(order);
        order.id = dborder.id as number;

        //create product
        const dbproduct = await ProductEntity.create(product); //id = 1
        product.id = dbproduct.id as number;
    });
    it('Should have an showAll method', () => {
        expect(OrderProductEntity.showAll).toBeDefined();
    });
    it('Should have an showByOrder method', () => {
        expect(OrderProductEntity.showByOrder).toBeDefined();
    });
    it('Should have an showUserOrders method', () => {
        expect(OrderProductEntity.showUserOrders).toBeDefined();
    });
    it('Should have an addProduct method', () => {
        expect(OrderProductEntity.addProduct).toBeDefined();
    });
    it('Should have an deleteProduct method', () => {
        expect(OrderProductEntity.deleteProduct).toBeDefined();
    });
    it('Should have an deleteOrder method', () => {
        expect(OrderProductEntity.deleteOrder).toBeDefined();
    });
    it('should gets no orders from showAll()', async () => {
        const result = await OrderProductEntity.showAll();
        expect(result).toEqual([]);
    });

    it('Should add product to order using addProduct()', async () => {
        const result = await OrderProductEntity.addProduct({
            order_id: order.id as number,
            product_id: product.id as number,
            quantity: productQuantity,
        });
        expect(result).toEqual({
            id: 1,
            order_id: order.id as number,
            product_id: product.id as number,
            quantity: productQuantity,
        });
    });
    it('Should show order products using showByOrder()', async () => {
        const result: completeOrder = await OrderProductEntity.showByOrder(
            order
        );
        const answer = {
            order_id: order.id as number,
            order_status: order.status,
            user_id: user.id,
            user_name: `${user.first_name} ${user.last_name}`,
            products: [
                {
                    product_id: product.id,
                    quantity: productQuantity,
                    name: product.name,
                    price: product.price,
                },
            ],
        };
        expect(result).toEqual(answer as completeOrder);
    });
    it('Should show order products using showUserOrders()', async () => {
        const result = await OrderProductEntity.showUserOrders(user);
        const answer = {
            user_id: user.id,
            user_name: `${user.first_name} ${user.last_name}`,
            orders: [
                {
                    order_id: order.id,
                    order_status: order.status,
                    user_id: user.id,
                    user_name: `${user.first_name} ${user.last_name}`,
                    products: [
                        {
                            product_id: product.id,
                            quantity: productQuantity,
                            name: product.name,
                            price: product.price,
                        },
                    ],
                },
            ],
        };
        expect(result).toEqual(answer as userOrders);
    });
    it('Should delete product in order using deleteProduct()', async () => {
        const result = await OrderProductEntity.deleteProduct(
            product.id as number,
            order.id as number
        );

        expect(result).toEqual({
            id: 1,
            order_id: order.id as number,
            product_id: product.id as number,
            quantity: productQuantity,
        });
    });
    it('Should delete all order products using deleteOrder()', async () => {
        const result = await OrderProductEntity.deleteOrder(order.id as number);

        expect(result).toEqual([]);
    });
    afterAll(async () => {
        await ProductEntity.deleteById(product.id as number);
        await orderEntity.deleteById(order.id as number);
        await UserEntity.deleteById(user.id as number);
    });
});
