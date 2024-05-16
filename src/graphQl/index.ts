import { ApolloServer, gql } from 'apollo-server-express';
import { Express } from "express";

export const typeDefs = gql(`
  type Query {
    hello: String
  }
`);


export const resolvers = {
    Query: {
        hello: () => 'Hello GraphQL world!👋',
    },
};


export const runGraphQlServer = async (app: Express) => {
    const graphQlServer = new ApolloServer({ typeDefs, resolvers });
    await graphQlServer.start();
    graphQlServer.applyMiddleware({ app });
}
