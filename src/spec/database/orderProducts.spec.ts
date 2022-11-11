import OrdersModel from '../../models/order.model';
import OrderProductsModel from '../../models/orderProducts.model';
import ProductModel from '../../models/product.model';
import UserModel from '../../models/user.model';
import { completeOrder, userOrders } from '../../modules/formateJson.modules';

const OrderProductEntity=new OrderProductsModel;
const UserEntity=new UserModel;
const orderEntity=new OrdersModel;
const ProductEntity=new ProductModel;
describe("OrderProduct Model testing suit",()=>{
    beforeAll(async ()=>{
        const user=await UserEntity.create({
            first_name:"Mohamed",
            last_name:"Saed",
            password:"123456"
        });//id = 1
        const order= await orderEntity.create({
            user_id:2,
            status:"active"
        })//id = 2
        const product=await ProductEntity.create({
            name:"sheet",
            price:2
        })//id = 1
    })
    it("Should have an showAll method",() => {
        expect(OrderProductEntity.showAll).toBeDefined();
    })
    it("Should have an showByOrder method",() => {
        expect(OrderProductEntity.showByOrder).toBeDefined();
    })
    it("Should have an showUserOrders method",() => {
        expect(OrderProductEntity.showUserOrders).toBeDefined();
    })
    it("Should have an addProduct method",() => {
        expect(OrderProductEntity.addProduct).toBeDefined();
    })
    it("Should have an deleteProduct method",() => {
        expect(OrderProductEntity.deleteProduct).toBeDefined();
    })
    it("Should have an deleteOrder method",() => {
        expect(OrderProductEntity.deleteOrder).toBeDefined();
    })
    it("should gets no orders from showAll()",async()=>{
        const result= await OrderProductEntity.showAll()
        expect(result.length).toBe(0);
    })
    /*
    order_id=2,
    order_status='active'
    ---
    product_id=1,
    product_name=sheet
    product_price=2
    ---
    user_id=2
    */
    it("Should add product to order using addProduct()",async()=>{
        const result=await OrderProductEntity.addProduct({
            order_id:2,
            product_id:1,
            quantity:5
        })
        expect(result).toEqual({
            id:1,
            order_id:2,
            product_id:1,
            quantity:5
        })
    })
    it("Should show order products using showByOrder()",async()=>{
        const result:completeOrder=await OrderProductEntity.showByOrder({
            id:2,
            user_id:2,
            status:'active'
        })
        const answer={
            order_id:2,
            order_status:'active',
            products:[
                {
                    product_id:1,
                    quantity:5,
                    name:'sheet',
                    price:2
                }
            ]
            
        };
        expect(result).toEqual(answer as completeOrder)
    })
    it("Should show order products using showUserOrders()",async()=>{
        const result=await OrderProductEntity.showUserOrders({
            id:2,
            first_name:'Mohamed',
            last_name:'Saed'
        })
        const answer={
            user_id:2,
            user_name:'Mohamed Saed',
            orders:[
                {
                    order_id:2,
                    order_status:'active',
                    products:[{
                        product_id:1,
                        quantity:5,
                        name:'sheet',
                        price:2}]
                }
            ]
            
        };
        expect(result).toEqual(answer as userOrders)
    })
    it("Should delete product in order using deleteProduct()",async()=>{
        const result=await OrderProductEntity.deleteProduct(1,2)
        
        expect(result).toEqual({
            id:1,
            order_id:2,
            product_id:1,
            quantity:5}
        )
    })
    it("Should delete all order products using deleteOrder()",async()=>{
        const result=await OrderProductEntity.deleteOrder(2)
        
        expect(result).toEqual([])
    })
    afterAll(async()=>{
        const product=await ProductEntity.deleteById(1);
        const order=await orderEntity.deleteById(2);
        const user= await UserEntity.deleteById(2);
    })
})