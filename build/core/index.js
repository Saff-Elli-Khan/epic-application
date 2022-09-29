"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv");
require("./logger");
const server_1 = require("./server");
// Start Application Server
server_1.HTTPServer.listen(process.env.PORT || 3742);
