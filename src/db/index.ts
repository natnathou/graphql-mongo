import { MongoClient } from 'mongodb'
import {userService} from "../api/providers/user.service";

const url = 'mongodb://localhost:27017';
const dbClient = new MongoClient(url);

export const getGraphQlCollection = () => {
    return dbClient.db('graphQl');
}

export const connectDb = async () =>{
    try {
        await dbClient.connect();
        console.log('Connected successfully to db');
        await userService.setUniqueIndex();
    } catch (err) {
        console.error(`Error connecting to db: ${err}`);
        throw err;
    }
}
