import Path from "path";
import DotEnv from "dotenv";
import HTTP from "http";
import { Server } from "./App.server";
import { Middlewares } from "./App.middlewares";

// Load Environment Variables
DotEnv.config({
  path: Path.join(process.cwd(), `env/.${process.env.NODE_ENV}.env`),
});

// Start Listening On Port
Server.listen(HTTP.createServer(Server.App), process.env.PORT || 8080);

// Wrap Application Core Middlewares
Middlewares(Server.App);
