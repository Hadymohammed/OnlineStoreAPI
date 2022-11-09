import { Request, Response } from "express";
import productModel, { Product } from "../models/product.model";

const product=new productModel();

const index =async (req:Request,res:Response):Promise<void> => {
    try{
        const data=await product.showAll();
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
        const data=await product.getById(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}
const addProduct =async (req:Request,res:Response):Promise<void> => {
    /*
    to do token
    */
    try{
        //accepts body in json format
        const name=req.body.name;
        const price=req.body.price;
        const newProduct:Product={name,price};
        const data=await product.create(newProduct);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}
export {index,Show,addProduct};