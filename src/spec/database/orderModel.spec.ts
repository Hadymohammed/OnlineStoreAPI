import OrderModel, { Order } from '../../models/order.model';
import UserModel, { User } from '../../models/user.model';

const OrderEntity = new OrderModel();
const UserEntity = new UserModel();
const user: User = {
    first_name: 'Abdelhady',
    last_name: 'Mohamed',
};
const order: Order = {
    user_id: 0,
    status: 'active',
};
describe('Order Model testing suit', () => {
    beforeAll(async () => {
        const dbuser = await UserEntity.create(user);
        user.id = dbuser.id;
        order.user_id = user.id as number;
    });
    it('Should have an showAll method', () => {
        expect(OrderEntity.showAll).toBeDefined();
    });
    it('Should have an getByOrderId method', () => {
        expect(OrderEntity.getByOrderId).toBeDefined();
    });
    it('Should have an getByUserId method', () => {
        expect(OrderEntity.getByUserId).toBeDefined();
    });
    it('Should have an create method', () => {
        expect(OrderEntity.create).toBeDefined();
    });
    it('Should have an update method', () => {
        expect(OrderEntity.update).toBeDefined();
    });
    it('should gets no orders from showAll()', async () => {
        const result = await OrderEntity.showAll();
        expect(result).toEqual([]);
    });

    it('Should create order', async () => {
        const result = await OrderEntity.create(order);
        order.id = result.id;
        expect(result).toEqual(order);
    });
    it('Should gets order using getByOrderId()', async () => {
        const result = await OrderEntity.getByOrderId(order.id as number);
        expect(result).toEqual(order);
    });
    it('Should gets array of orders using getByUserId()', async () => {
        const result = await OrderEntity.getByUserId(order.id as number);
        expect(result[0]).toEqual(order);
    });
    it('Should updates order using update()', async () => {
        order.status = 'complete';
        const result = await OrderEntity.update(order);
        expect(result).toEqual(order);
    });
    it('Should deletes order using deleteById()', async () => {
        const result = await OrderEntity.deleteById(order.id as number);
        expect(result).toEqual(order);
    });
    afterAll(async () => {
        await OrderEntity.getByOrderId(order.id as number);
        await UserEntity.deleteById(user.id as number);
    });
});
