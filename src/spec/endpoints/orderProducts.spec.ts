import supertest from 'supertest';
import app from '../../app';
import OrdersModel, { Order } from '../../models/order.model';
import ProductModel, { Product } from '../../models/product.model';
import UserModel, { User } from '../../models/user.model';
import generateToken from '../../services/tokens.services';

const request = supertest(app);
const userEntity = new UserModel();
const productEntity = new ProductModel();
const orderEntity = new OrdersModel();

const user: User = {
    first_name: 'khaled',
    last_name: 'mohamed',
    password: '12345678',
};
const order: Order = {
    user_id: 0,
    status: 'active',
};
const product: Product = {
    name: 'laptop',
    price: 1000,
};
const token = generateToken(user); //get valid token

describe('./orders end points for products relations tests', () => {
    beforeAll(async () => {
        //create testing user
        const UserResponse = await request.post('/users/create').send(user);
        user.id = UserResponse.body.user_id as number;
        order.user_id = user.id;
        //create testing product
        const productResponse = await request
            .post('/products/create')
            .send(product)
            .set('Authorization', 'Bearer ' + token);
        product.id = productResponse.body.id;
        //create testing order
        const orderResponse = await request
            .post('/orders/create')
            .send(order)
            .set('Authorization', 'Bearer ' + token);
        order.id = orderResponse.body.id;
    });
    it('./orders/addProduct should exist and get authorized access', async () => {
        const response = await request
            .post('/orders/addProduct')
            .send(product)
            .set('Authorization', 'Bearer ' + token);
        console.log(response.body);
        expect(response.status).toBe(200);
    });
    it('./orders/products should exist and get unauthorized access', async () => {
        const response = await request.get('/orders/products');
        expect(response.status).toBe(401);
    });
    it('./orders/user should exist and get unauthorized access', async () => {
        const response = await request.get('/orders/user');
        expect(response.status).toBe(401);
    });
    it('./orders/deleteProduct should exist and get authorized access', async () => {
        const response = await request
            .delete('/orders/deleteProduct')
            .send({ order, product })
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
    });
    afterAll(async () => {
        await orderEntity.deleteById(order.id as number);
        await userEntity.deleteById(user.id as number);
        await productEntity.deleteById(product.id as number);
    });
});
