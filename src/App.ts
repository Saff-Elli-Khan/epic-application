import HTTP from "http";
import { Server } from "./App.server";
import { Middlewares } from "./App.middlewares";

// Start Listening On Port
Server.listen(HTTP.createServer(Server.App), process.env.PORT || 8080);

// Load Environment Variables
require("dotenv").config();

// Wrap Application Core Middlewares
Middlewares(Server.App);
