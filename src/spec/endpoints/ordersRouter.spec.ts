import supertest from 'supertest';
import app from '../../app';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import generateToken from '../../services/tokens.services';

const request = supertest(app);

const user: User = {
    first_name: 'khaled',
    last_name: 'mohamed',
    password: '12345678',
};

const order: Order = {
    user_id: 0,
    status: 'active',
};
const token = generateToken(user); //get valid token

describe('./orders endpoints tests', () => {
    beforeAll(async () => {
        const response = await request.post('/users/create').send(user);
        user.id = response.body.user_id as number;
        order.user_id = user.id;
    });
    it('./orders/create should exist , get authorized access and returns new order', async () => {
        const response = await request
            .post('/orders/create')
            .send(order)
            .set('Authorization', 'Bearer ' + token);
        order.id = response.body.id;
        expect(response.status).toBe(200);
        expect(response.body).toEqual(order);
    });
    it('./orders should exist and get authorized access and returns list of orders', async () => {
        const response = await request
            .get('/orders')
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body[0]).toEqual(order);
    });
    it('./orders/show should exist and get authorized access and returns the order', async () => {
        const response = await request
            .get('/orders/show')
            .send(order)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(order);
    });
    it('./orders/update should exist and get authorized access and returns the updated order', async () => {
        order.status = 'complete';
        const response = await request
            .patch('/orders/update')
            .send(order)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(order);
    });
    it('./orders/delete should exist and get authorized access and returns the deleted order', async () => {
        const response = await request
            .delete('/orders/delete')
            .send(order)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(order);
    });
});
