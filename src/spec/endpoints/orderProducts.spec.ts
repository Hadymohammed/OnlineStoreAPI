import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('./orders end points for products relations tests', () => {
    it('./orders/products should exist and get unauthorized access', async () => {
        const response = await request.get('/orders/products');
        expect(response.status).toBe(401);
    })
        it('./orders/user should exist and get unauthorized access', async () => {
            const response = await request.get('/orders/user');
            expect(response.status).toBe(401);
        })
        it('./orders/addProduct should exist and get unauthorized access', async () => {
            const response = await request.post('/orders/addProduct');
            expect(response.status).toBe(401);
        })
        it('./orders/deleteProduct should exist and get unauthorized access', async () => {
            const response = await request.delete('/orders/deleteProduct');
            expect(response.status).toBe(401);
        })
});
