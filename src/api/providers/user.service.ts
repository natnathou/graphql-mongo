import {User} from "../interfaces/user.interfaces";
import {userProvider} from "./user.provider";

const setUniqueIndex = () => {
    return userProvider.setUniqueIndex();
}


const createUser = async (user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    return userProvider.insertUser(user);
}

const getOneUser = async (id: string): Promise<User> => {
    return userProvider.findOneUser(id);
}

const updateUser = async (id: string, user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    return userProvider.updateUser(id, user);
}

const deleteUser = async (id: string): Promise<User> => {
    return userProvider.deleteUser(id);
}

const getAllUsers = async (): Promise<User[]> => {
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
