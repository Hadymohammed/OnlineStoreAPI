import ProductModel, { Product } from '../../models/product.model';

const productEntity = new ProductModel();
//products id starts from 1
const product: Product = {
    name: 'bag',
    price: 10,
};
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
    it('Should create product', async () => {
        const result = await productEntity.create(product);
        product.id = result.id;
        expect(result).toEqual(product);
    });
    it('Should return no products showAll()', async () => {
        const result = await productEntity.showAll();
        expect(result[0]).toEqual(product);
    });
    it('Should get product using id', async () => {
        const result = await productEntity.getById(product.id as number);
        expect(result).toEqual(product);
    });
    it('Should updates product.price using update', async () => {
        product.price = 20;
        const result = await productEntity.update(product);
        expect(result).toEqual(product);
    });
    it('Should deletes product using deleteById', async () => {
        const result = await productEntity.deleteById(product.id as number);
        expect(result).toEqual(product);
    });
});
