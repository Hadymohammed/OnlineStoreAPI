import ProductModel, { Product } from '../models/product.model';

const productEntity = new ProductModel();
const getUpdatedProduct = async (newProduct: Product): Promise<Product> => {
    const dbProduct: Product = await productEntity.getById(newProduct.id as number);
    if (newProduct.name != null) dbProduct.name = newProduct.name;
    if (newProduct.price != null) dbProduct.price = newProduct.price;

    return dbProduct;
};

export default getUpdatedProduct;
