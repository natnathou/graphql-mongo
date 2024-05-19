import {getGraphQlCollection} from "../../db";
import {ObjectId} from "mongodb";
import {UserModel} from "../models/user.model";

const setUniqueIndex = async () => {
    const result = await getGraphQlCollection().collection('users').createIndex({ email: 1 }, { unique: true});
    console.log('Index created successfully on email field, on users collection');
}

const insertUser = async (user: Omit<UserModel, '_id' | 'createdAt' | 'updatedAt'>): Promise<UserModel> => {
    const collection = getGraphQlCollection().collection('users');
    const { insertedId } = await collection.insertOne({...user, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()});
    const result = await collection.findOne<UserModel>({_id: insertedId});
    return result;
}

const findOneUser = async (id: string): Promise<UserModel> => {
    const collection = getGraphQlCollection().collection('users');
    const result = await collection.findOne<UserModel>({_id: new ObjectId(id)});
    return result;
}

const updateUser = async (id: string, user: Partial<Omit<UserModel, '_id' | 'createdAt' | 'updatedAt'>>): Promise<UserModel> => {
    const collection = getGraphQlCollection().collection('users');
    const result = await collection.findOneAndUpdate({_id: new ObjectId(id)}, {$set: { ...user, updatedAt: new Date().toISOString()}}, {returnDocument: 'after'}) as UserModel;
    return result;
}

const deleteUser = async (id: string): Promise<UserModel> => {
    const collection = getGraphQlCollection().collection('users');
    const result= await collection.findOneAndDelete({_id: new ObjectId(id)}) as UserModel;
    return result;
}

const findUsers = async (): Promise<UserModel[]> => {
    const collection = getGraphQlCollection().collection('users');
    const result = await collection.find().toArray() as UserModel[];
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
