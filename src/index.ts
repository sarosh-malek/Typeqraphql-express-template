import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./module/user/register";

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });

  const apolloServer = new ApolloServer({ schema });

  const app = Express();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  app.listen(5000, () => {
    console.log("server started at localhost:5000");
  });
};

main();
