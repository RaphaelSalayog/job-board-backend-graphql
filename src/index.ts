import express, { Express, Request, Response, NextFunction } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import fs from "fs";

import resolvers from "./resolver";
import cors from "cors";
import { signup } from "./models/auth";
import bodyParser from "body-parser";
import { CustomError } from "./interface/model";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(cors(), bodyParser.json(), express());

app.post("/signup", signup);
// app.post("/login", login);

const typeDefs = gql(
  fs.readFileSync("./src/schema.graphql", { encoding: "utf8" })
);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return { sample: "sample" };
  },
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.use(
  (error: CustomError, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    const statusCode = error.statusCode || 500;
    const message = error.message;
    res.status(statusCode).json({
      message: message,
      statusCode: statusCode,
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server connected in port ${PORT}`);
});
