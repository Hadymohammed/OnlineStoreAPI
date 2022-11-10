import { Request, Response } from "express";
import ordersModel, { Order } from "../models/order.model";
import orderProductsModel,{orderProduct} from "../models/orderProducts.model";

const orderProductsEntity=new orderProductsModel;
const orderEntity=new ordersModel;
const ShowOrder =async (req:Request,res:Response):Promise<void> => {
    try{
        //accepts body in json format
        const id=req.body.order_id;
        const order=await orderEntity.getById(id);
        const data=await orderProductsEntity.showByOrder(order);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}

const addProduct =async (req:Request,res:Response):Promise<void> => {
    try{
        //accepts body in json format
        const order_id=req.body.order_id;
        const product_id=req.body.product_id;
        const quantity=req.body.quantity;
        const product:orderProduct={order_id,product_id,quantity};
        const data=await orderProductsEntity.addProduct(product);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error" + err);
    }
}

const deleteOrder =async (req:Request,res:Response):Promise<void> =>{
    const order:Order={
        id:req.body.id,
        user_id:req.body.user_id,
        status:req.body.status
    }
    try{
        const data=await orderProductsEntity.deleteOrder(order.id as number);
        res.send(data);
    }
    catch(err){
        res.json('Invalid : '+err);
    }
}

const deleteProduct=async (req:Request,res:Response):Promise<void> =>{
    const product:orderProduct={
        order_id:req.body.order_id,
        product_id:req.body.product_id,
    }
    try{
        const data=await orderProductsEntity.deleteProduct(product.product_id,product.order_id);
        res.send(data);
    }
    catch(err){
        res.json('Invalid : '+err);
    }
}
export {ShowOrder,addProduct,deleteOrder,deleteProduct};