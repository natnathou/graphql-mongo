import {userProvider} from "./user.provider";
import {UserModel} from "../models/user.model";

const setUniqueIndex = () => {
    return userProvider.setUniqueIndex();
}


const createUser = async (user: Omit<UserModel, '_id' | 'createdAt' | 'updatedAt'>): Promise<UserModel> => {
    return userProvider.insertUser(user);
}

const getOneUser = async (id: string): Promise<UserModel> => {
    return userProvider.findOneUser(id);
}

const updateUser = async (id: string, user: Partial<Omit<UserModel, '_id' | 'createdAt' | 'updatedAt'>>): Promise<UserModel> => {
    return userProvider.updateUser(id, user);
}

const deleteUser = async (id: string): Promise<UserModel> => {
    return userProvider.deleteUser(id);
}

const getAllUsers = async (): Promise<UserModel[]> => {
    return userProvider.findUsers();

}

export const userService = {
    setUniqueIndex,
    createUser,
    getOneUser,
    updateUser,
    deleteUser,
    getAllUsers
}
