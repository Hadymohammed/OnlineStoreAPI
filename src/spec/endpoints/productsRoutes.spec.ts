import supertest from 'supertest';
import app from '../../app';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import generateToken from '../../services/tokens.services';

const request = supertest(app);
const user: User = {
    first_name: 'khaled',
    last_name: 'mohamed',
    password: '12345678',
};
const product: Product = {
    name: 'laptop',
    price: 1000,
};
const token = generateToken(user); //get valid token

describe('./products end points for products relations tests', () => {
    it('./products/create should exist, get authorized access and returns the product', async () => {
        const response = await request
            .post('/products/create')
            .send(product)
            .set('Authorization', 'Bearer ' + token);
        product.id = response.body.id;
        expect(response.status).toBe(200);
        expect(response.body).toEqual(product);
    });
    it('./products should exist and returns products', async () => {
        const response = await request.get('/products');
        expect(response.status).toBe(200);
        expect(response.body[0]).toEqual(product);
    });
    it('./products/show should exist', async () => {
        const response = await request.get('/products/show').send(product);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(product);
    });
    it('./products/update should exist , get authorized access and returns updated product', async () => {
        product.price = 2000;
        const response = await request
            .patch('/products/update')
            .send(product)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(product);
    });
    it('./products/delete should exist, get authorized access and returns deleted product', async () => {
        const response = await request
            .delete('/products/delete')
            .send(product)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(product);
    });
});
