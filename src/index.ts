import express, { Express } from "express";
import { ApolloServer, gql } from "apollo-server-express";
import fs from "fs";
import jwt, { JwtPayload } from "jsonwebtoken";
import db from "../util/database";

import resolvers from "./resolver";
import cors from "cors";
import bodyParser from "body-parser";
import { RowDataPacket } from "mysql2";

const app: Express = express();
const PORT = process.env.PORT || 8080;

app.use(cors(), bodyParser.json(), express());

// app.post("/signup", signup);

const typeDefs = gql(
  fs.readFileSync("./src/schema.graphql", { encoding: "utf8" })
);
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.get("Authorization")?.split(" ")[1];
    if (token) {
      const decodedToken = jwt.verify(token, "secrettoken") as JwtPayload;
      const [data, fields] = await db.execute<RowDataPacket[]>(
        `SELECT id, companyId, email, password FROM users WHERE id="${decodedToken.userId}"`
      );
      return { user: data[0] };
    }
    return {};
  },
});
apolloServer.applyMiddleware({ app, path: "/graphql" });

app.listen(PORT, () => {
  console.log(`Server connected in port ${PORT}`);
});
