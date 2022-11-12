import UserModel, { User } from '../../models/user.model';

const userEntity = new UserModel();
const user: User = {
    first_name: 'Ahmed',
    last_name: 'Mohamed',
    password: '123123',
};
describe('User Model testing suit', () => {
    it('Should have an index method', () => {
        expect(userEntity.index).toBeDefined();
    });
    it('Should have an getById method', () => {
        expect(userEntity.getById).toBeDefined();
    });
    it('Should have an deleteById method', () => {
        expect(userEntity.deleteById).toBeDefined();
    });
    it('Should have an create method', () => {
        expect(userEntity.create).toBeDefined();
    });
    it('Should have an update method', () => {
        expect(userEntity.update).toBeDefined();
    });

    it('Should create user', async () => {
        const result = await userEntity.create(user);
        user.id = result.id;
        delete user.password;
        delete result.password;
        expect(result).toEqual(user);
    });
    it('Shold gets user from getById()', async () => {
        const result = await userEntity.getById(user.id as number);
        delete result.password;
        expect(result).toEqual(user);
    });
    it('Should updates user', async () => {
        user.first_name = 'Mohamed';
        const result = await userEntity.update(user);
        delete result.password;
        expect(result).toEqual(user);
    });
    it('Should deletes user', async () => {
        const result = await userEntity.deleteById(user.id as number);
        delete result.password;
        expect(result).toEqual(user);
    });
});
