import db from '../providers/database.provider'

export interface Product{
    id?:number,
    name:string,
    price:number
}

class productModel{
    async create(product:Product):Promise<Product>{
        const { rows } = await db.query(
            'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *',
            [product.name, product.price]
        );
        return rows[0];
    }
    async showAll():Promise<Product[]>{
        const {rows}=await db.query(
            'select * from products;'
        );
        return rows;
    }
    async getById(id:number):Promise<Product>{
        const {rows}=await db.query(
            'select * from products where id=$1;',
            [id]
        );
        return rows[0];
    }
}
export default productModel;