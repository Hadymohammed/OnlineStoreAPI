import userModel, { User } from '../models/user.model';
import db from '../providers/database.provider';

const userEntity = new userModel();
const getUpdatedUser = async (newUser: User): Promise<User> => {
    const dbUser: User = await userEntity.getById(newUser.id as number);
    if (newUser.first_name != null) dbUser.first_name = newUser.first_name;
    if (newUser.last_name != null) dbUser.last_name = newUser.last_name;

    return dbUser;
};

export default getUpdatedUser;
