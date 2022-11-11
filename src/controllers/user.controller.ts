import hash from '../services/hash.services';
import { Request, Response } from 'express';
import UserModel, { User } from '../models/user.model';
import generateToken from '../services/tokens.services';
import varifyUser from '../services/varifyUser.services';
import getUpdatedUser from '../modules/updatedUser.modules';
import formatting, { formatedUser } from '../modules/formateJson.modules';

const format=new formatting;
const userEntity = new UserModel();

const index = async (req: Request, res: Response): Promise<void> => {
    try {
        const data = await userEntity.index();
        const formatedData:formatedUser[]=[];
        for (const row of data) {
            formatedData.push(format.user(row));
        }
        res.send(formatedData);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};
const Show = async (req: Request, res: Response): Promise<void> => {
    try {
        // accepts body in json format
        const id = req.body.id;
        const data = await userEntity.getById(id);
        const formatedData= format.user(data);
        res.send(formatedData);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};
const create = async (req: Request, res: Response): Promise<void> => {
    try {
        // accepts body in json format
        const user: User = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
        };
        user.password = hash(user.password as string);
        user.token = generateToken(user);
        const data = await userEntity.create(user);
        const formatedData=format.user(data);
        res.send(formatedData);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
};
const update = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    const Varification = await varifyUser(
        user.id as number,
        user.password as string
    );
    if (Varification) {
        try {
            const updated = await getUpdatedUser(user);
            const data = await userEntity.update(updated);
            const formatedData=format.user(data);
            res.send(formatedData);
        } catch (err) {
            res.status(401);
            res.json('invalid user ' + err);
        }
    } else {
        res.json('Varification failed');
    }
};
const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const user: User = {
        id: req.body.id,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
    };
    const Varification = await varifyUser(
        user.id as number,
        user.password as string
    );
    if (Varification) {
        try {
            const data = await userEntity.deleteById(user.id as number);
            const formatedData=format.user(data);
            res.send(formatedData);
        } catch (err) {
            res.json('Invalid : ' + err);
        }
    } else {
        res.json('Varification Failed');
    }
};
export { index, Show, create, deleteUser, update };
