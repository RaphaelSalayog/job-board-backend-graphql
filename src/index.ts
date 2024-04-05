import express, { Express, Request, Response } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import fs from "fs";

import resolvers from "./resolver";
import cors from "cors";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(cors(), express());

const typeDefs = gql(
  fs.readFileSync("./src/schema.graphql", { encoding: "utf8" })
);
const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`Server connected in port ${PORT}`);
});
