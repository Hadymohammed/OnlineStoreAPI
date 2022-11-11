import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('./orders endpoints tests', () => {
    it('./orders should exist', async () => {
        const response = await request.get('/orders');
        expect(response.status).toBe(200);
    });
    it('./orders/show should exist', async () => {
        const response = await request.get('/orders/show');
        expect(response.status).toBe(200);
    });
    it('./orders/create should exist and get unauthorized access', async () => {
        const response = await request.post('/orders/create');
        expect(response.status).toBe(401);
    });
    it('./orders/update should exist and get unauthorized access', async () => {
        const response = await request.patch('/orders/update');
        expect(response.status).toBe(401);
    });
    it('./orders/delete should exist and get unauthorized access', async () => {
        const response = await request.delete('/orders/delete');
        expect(response.status).toBe(401);
    });
});
