import ProductModel from '../../models/product.model';

const productEntity = new ProductModel();
//products id starts from 1
describe('Product Model testing suit', () => {
    it('Should have an showAll method', () => {
        expect(productEntity.showAll).toBeDefined();
    });
    it('Should have an getById method', () => {
        expect(productEntity.getById).toBeDefined();
    });
    it('Should have an deleteById method', () => {
        expect(productEntity.deleteById).toBeDefined();
    });
    it('Should have an create method', () => {
        expect(productEntity.create).toBeDefined();
    });
    it('Should have an update method', () => {
        expect(productEntity.update).toBeDefined();
    });
    it('Should return no products showAll()', async () => {
        const result = await productEntity.showAll();
        expect(result).toEqual([]);
    });
    it('Should create product', async () => {
        const result = await productEntity.create({
            name: 'bag',
            price: 10,
        });
        expect(result).toEqual({
            id: 2,
            name: 'bag',
            price: 10,
        });
    });
    it('Should get product using id', async () => {
        const result = await productEntity.getById(2);
        expect(result).toEqual({
            id: 2,
            name: 'bag',
            price: 10,
        });
    });
    it('Should updates product.price using update', async () => {
        const result = await productEntity.update({
            id: 2,
            name: 'bag',
            price: 20,
        });
        expect(result).toEqual({
            id: 2,
            name: 'bag',
            price: 20,
        });
    });
    it('Should deletes product using deleteById', async () => {
        const result = await productEntity.deleteById(2);
        expect(result).toEqual({
            id: 2,
            name: 'bag',
            price: 20,
        });
    });
});
