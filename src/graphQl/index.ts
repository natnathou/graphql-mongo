import { ApolloServer, gql } from 'apollo-server-express';
import { Express } from "express";
import {User} from "../api/interfaces/user.interfaces";
import {userService} from "../api/providers/user.service";

export const typeDefs = gql(`
  type Query {
    hello: String
    users: [User]
    user(id: String!): User
  }
  
  type Mutation {
    createUser(name: String!, email: String!, password: String!, role: String!): User
    updateUser(id: String!, name: String, email: String, password: String, role: String): User
    deleteUser(id: String!): User
  }
  
  type User{
    _id: String!
    name: String!
    email: String!
    password: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }
`);


export const resolvers = {
    Query: {
        hello: () => 'Hello GraphQL world!👋',
        users: () => userService.getAllUsers(),
        user: (_, {id}: {id:string}) => userService.getOneUser(id),
    },
    Mutation: {
        createUser: (_, user: Omit<User, '_id' | 'createdAt' | 'updatedAt'>) => userService.createUser(user),
        updateUser: (_, {id, ...user}: Omit<User, '_id' | 'createdAt' | 'updatedAt'> & { id: string }) => userService.updateUser(id, user),
        deleteUser: (_, {id}: {id:string}) => userService.deleteUser(id),
    }
};


export const runGraphQlServer = async (app: Express) => {
    const graphQlServer = new ApolloServer({ typeDefs, resolvers });
    await graphQlServer.start();
    graphQlServer.applyMiddleware({ app });
}
