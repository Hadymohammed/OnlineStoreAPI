import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('./products end points for products relations tests', () => {
    it('./products should exist', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
    });
    it('./products/show should exist', async () => {
        const response = await request.get('/products/show');
        expect(response.status).toBe(200);
    });
    it('./products/create should exist and get unauthorized access', async () => {
        const response = await request.post('/products/create');
        expect(response.status).toBe(401);
    });
    it('./products/update should exist and get unauthorized access', async () => {
        const response = await request.patch('/products/update');
        expect(response.status).toBe(401);
    });
    it('./products/delete should exist and get unauthorized access', async () => {
        const response = await request.delete('/products/delete');
        expect(response.status).toBe(401);
    });
});
