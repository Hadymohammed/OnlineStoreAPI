import OrderModel from '../../models/order.model';
import UserModel from '../../models/user.model';

const OrderEntity = new OrderModel();
const UserEntity = new UserModel();

describe('Order Model testing suit', () => {
    it('Should have an showAll method', () => {
        expect(OrderEntity.showAll).toBeDefined();
    });
    it('Should have an getByOrderId method', () => {
        expect(OrderEntity.getByOrderId).toBeDefined();
    });
    it('Should have an getByUserId method', () => {
        expect(OrderEntity.getByUserId).toBeDefined();
    });
    it('Should have an deleteById method', () => {
        expect(OrderEntity.deleteById).toBeDefined();
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

    it('should creates a user', async () => {
        const user = await UserEntity.create({
            first_name: 'Abdelhady',
            last_name: 'Mohamed',
        });
        expect(user).toEqual({
            id: 1,
            first_name: 'Abdelhady',
            last_name: 'Mohamed',
        });
    });
    it('Should create order', async () => {
        const result = await OrderEntity.create({
            user_id: 1,
            status: 'active',
        });
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: 'active',
        });
    });
    it('Should gets order using getByOrderId()', async () => {
        const result = await OrderEntity.getByOrderId(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: 'active',
        });
    });
    it('Should gets array of orders using getByUserId()', async () => {
        const result = await OrderEntity.getByUserId(1);
        expect(result).toEqual([
            {
                id: 1,
                user_id: 1,
                status: 'active',
            },
        ]);
    });
    it('Should updates order using update()', async () => {
        const result = await OrderEntity.update({
            id: 1,
            user_id: 1,
            status: 'complete',
        });
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: 'complete',
        });
    });
    it('Should deletes order using deleteById()', async () => {
        const result = await OrderEntity.deleteById(1);
        expect(result).toEqual({
            id: 1,
            user_id: 1,
            status: 'complete',
        });
    });
});
