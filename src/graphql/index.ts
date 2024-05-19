import { ApolloServer } from 'apollo-server-express';
import { Express } from "express";
import {userService} from "../api/providers/user.service";
import { readFileSync } from "fs";
import { join } from "path";
import {Resolvers} from "./resolvers-types";

const pathTypeDef = join(__dirname, '..', '..', './schema.graphql')
console.log(pathTypeDef)
const typeDefs = readFileSync(pathTypeDef, { encoding: 'utf8' });


export const resolvers: Resolvers = {
    Query: {
        hello: (_, {}) => 'Hello GraphQL world!👋',
        users: (_, args) => userService.getAllUsers(),
        user: (_, { id }) => userService.getOneUser(id),
    },
    Mutation: {
        createUser: (_, user ) => userService.createUser(user),
        updateUser: (_, { id, ...user}) => userService.updateUser(id, user),
        deleteUser: (_, { id }) => userService.deleteUser(id),
    }
};


export const runGraphQlServer = async (app: Express) => {
    const graphQlServer = new ApolloServer({ typeDefs, resolvers });
    await graphQlServer.start();
    graphQlServer.applyMiddleware({ app });
}
