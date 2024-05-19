import {ObjectId} from "mongodb";

export interface UserModel {
    _id: ObjectId;
    name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}
