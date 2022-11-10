import { Request, Response } from "express";
import ordersModel, { Order } from "../models/order.model";
import getUpdatedOrder from "../modules/updatedOrder.modules";

const orderEntity=new ordersModel();

const index =async (req:Request,res:Response):Promise<void> => {
    try{
        const data=await orderEntity.showAll();
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}
const Show =async (req:Request,res:Response):Promise<void> => {
    try{
        //accepts body in json format
        const id=req.body.id;
        const data=await orderEntity.getByOrderId(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}

const addOdrer =async (req:Request,res:Response):Promise<void> => {
    try{
        //accepts body in json format
        const user_id=req.body.user_id;
        const status=req.body.status;
        const newOdrer:Order={user_id,status};
        const data=await orderEntity.create(newOdrer);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error" + err);
    }
}

const deleteById =async (req:Request,res:Response):Promise<void> =>{
    const order:Order={
        id:req.body.id,
        user_id:req.body.user_id,
        status:req.body.status
    }
    try{
        const data=await orderEntity.deleteById(order.id as number);
        res.send(data);
    }
    catch(err){
        res.json('Invalid : '+err);
    }
}

const update =async (req:Request,res:Response):Promise<void> =>{
    const order:Order={
        id:req.body.id,
        user_id:req.body.user_id,
        status:req.body.status
    }
    try{
        const newOrder:Order= await getUpdatedOrder(order);
        const data=await orderEntity.update(newOrder);
        res.send(data);
    }
    catch(err){
        res.json('Invalid : '+err);
    }
}
export {index,Show,addOdrer,deleteById,update};