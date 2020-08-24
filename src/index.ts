import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import bodyparser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { MinistryResolver } from "./resolvers/ministryResolver";
import { RegisterResolver } from "./resolvers/dist/registerResolver";
dotenv.config();

const PORT = process.env.PORT;

async function main() {
  await createConnection();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [MinistryResolver, RegisterResolver],
    }),
  });
  const app = express();
  app.use(bodyparser.json());
  server.applyMiddleware({ app });

  //   app.get("/", (req, res) => {
  //     res.send("Hello Verdiqt API root!");
  //   });

  app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
}

main().catch((error) => console.log(error));
