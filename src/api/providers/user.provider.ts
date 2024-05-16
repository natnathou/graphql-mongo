import {getGraphQlCollection} from "../../db";
import {User} from "../interfaces/user.interfaces";
import {ObjectId} from "mongodb";

const setUniqueIndex = async () => {
    const result = await getGraphQlCollection().collection('users').createIndex({ email: 1 }, { unique: true});
    console.log('Index created successfully on email field, on users collection');
}

const insertUser = async (user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const collection = getGraphQlCollection().collection('users');
    const { insertedId } = await collection.insertOne({...user, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()});
    const result = await collection.findOne<User>({_id: insertedId});
    return result;
}

const findOneUser = async (id: string): Promise<User> => {
    const collection = getGraphQlCollection().collection('users');
    const result = await collection.findOne<User>({_id: new ObjectId(id)});
    return result;
}

const updateUser = async (id: string, user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
    const collection = getGraphQlCollection().collection('users');
    const result = await collection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: { ...user, updatedAt: new Date().toISOString()}}, {returnDocument: 'after'}) as User;
    return result;
}

const deleteUser = async (id: string): Promise<User> => {
    const collection = getGraphQlCollection().collection('users');
    const result= await collection.findOneAndDelete({_id: new ObjectId(id)}) as User;
    return result;
}

const findUsers = async (): Promise<User[]> => {
    const collection = getGraphQlCollection().collection('users');
    const result = await collection.find().toArray() as User[];
    return result;

}


export const userProvider = {
    setUniqueIndex,
    insertUser,
    findOneUser,
    updateUser,
    deleteUser,
    findUsers
}
