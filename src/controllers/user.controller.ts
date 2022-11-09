import hash  from '../services/hash.services';
import { Request, Response } from "express";
import userModel, { User } from "../models/user.model";
import generateToken from '../services/tokens.services';
import varifyUser from '../services/varifyUser.services';
import getUpdatedUser from '../modules/updatedUser.modules';

const userEntity=new userModel();

const index =async (req:Request,res:Response):Promise<void> => {
    try{
        const data=await userEntity.showAll();
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
        const data=await userEntity.getById(id);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}
const create =async (req:Request,res:Response):Promise<void> => {
    try{
        //accepts body in json format
        const user:User={
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            password:req.body.password
        }
        user.password=hash(user.password as string);
        user.token=generateToken(user);
        const data=await userEntity.create(user);
        res.send(data);
    }
    catch(err){
        res.status(500).send("Internal server error");
    }
}
const update =async (req:Request,res:Response):Promise<void> => {
    const user:User={
        id:req.body.id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        password:req.body.password
    }
    const Varification=await varifyUser(user.id as number,user.password as string)
    if(Varification===true){
        try{
            const updated=await getUpdatedUser(user);
            const data=await userEntity.update(updated);
            res.send(data);
        }
        catch(err){
            res.status(401);
            res.json("invalid user "+err);
        }
    }
    else{
        res.json("Varification failed");
    }
}
export {index,Show,create,update};