import supertest from 'supertest';
import app from '../../app';
import { User } from '../../models/user.model';
import generateToken from '../../services/tokens.services';

const request = supertest(app);
const user: User = {
    first_name: 'khaled',
    last_name: 'mohamed',
    password: '12345678',
};
const token: string = generateToken(user);
describe('./user end points tests', () => {
    it('./users/create should exist , get authorized access and return user', async () => {
        const response = await request.post('/users/create').send(user);
        user.id = response.body.user_id;
        expect(response.status).toBe(200);
        expect(response.body.user_name).toEqual(
            `${user.first_name} ${user.last_name}`
        );
    });
    it('./user should exist and get authorized access', async () => {
        const response = await request
            .get('/users')
            .set('Authorization', 'Bearer ' + token);
        user.id = response.body[1].user_id;
        expect(response.status).toBe(200);
        expect(response.body[1].user_name).toEqual(
            `${user.first_name} ${user.last_name}`
        );
    });
    it('./users/show should exist and get user', async () => {
        const response = await request
            .get('/users/show')
            .send(user)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user_id: user.id,
            user_name: `${user.first_name} ${user.last_name}`,
        });
    });
    it('./users/update should exist and get update user', async () => {
        user.first_name = 'Mahmoud';
        const response = await request
            .patch('/users/update')
            .send(user)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user_id: user.id,
            user_name: `${user.first_name} ${user.last_name}`,
        });
    });
    it('./users/delete should exist and get deleted user', async () => {
        const response = await request
            .delete('/users/delete')
            .send(user)
            .set('Authorization', 'Bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            user_id: user.id,
            user_name: `${user.first_name} ${user.last_name}`,
        });
    });
});
