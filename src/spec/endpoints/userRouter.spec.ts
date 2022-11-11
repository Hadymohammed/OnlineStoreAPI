import supertest from 'supertest';
import app from '../../app';

const request = supertest(app);

describe('./user end points tests', () => {
    it('./user should exist and get unauthorized access', async () => {
        const response = await request.get('/users');
        expect(response.status).toBe(401);
    });
    it('./users/show should exist', async () => {
        const response = await request.get('/users/show');
        expect(response.status).toBe(401);
    });
    it('./users/create should exist and get unauthorized access', async () => {
        const response = await request.post('/users/create');
        expect(response.status).toBe(401);
    });
    it('./users/update should exist and get unauthorized access', async () => {
        const response = await request.patch('/users/update');
        expect(response.status).toBe(401);
    });
    it('./users/delete should exist and get unauthorized access', async () => {
        const response = await request.delete('/users/delete');
        expect(response.status).toBe(401);
    });
});
