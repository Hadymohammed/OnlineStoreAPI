import { Request, Response } from "express";
import productModel, { Product } from "../models/product.model";

const productEntity=new productModel();

const index =async (req:Request,res:Response):Promise<void> => {
    try{
        const data=await productEntity.showAll();
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
        const data=await productEntity.getById(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}
const addProduct =async (req:Request,res:Response):Promise<void> => {
    try{
        //accepts body in json format
        const name=req.body.name;
        const price=req.body.price;
        const newProduct:Product={name,price};
        const data=await productEntity.create(newProduct);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}

const deleteById =async (req:Request,res:Response):Promise<void> =>{
    const product:Product={
        id:req.body.id,
        name:req.body.name,
        price:req.body.price
    }
    try{
        const data=await productEntity.deleteById(product.id as number);
        res.send(data);
    }
    catch(err){
        res.json('Invalid : '+err);
    }
}

const update =async (req:Request,res:Response):Promise<void> =>{
    const product:Product={
        id:req.body.id,
        name:req.body.name,
        price:req.body.price
    }
    try{
        const data=await productEntity.update(product);
        res.send(data);
    }
    catch(err){
        res.json('Invalid : '+err);
    }
}
export {index,Show,addProduct,deleteById,update};