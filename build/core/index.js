"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./loadEnv");
const server_1 = require("./server");
const events_1 = require("./events");
// Catch Logs
const Logger = console.log;
console.log = (...data) => {
    // Emit Event
    events_1.Events.emit("log_detected", ...data);
    // Log to Console
    Logger(...data);
};
// Start Application Server
server_1.HTTPServer.listen(process.env.PORT || 3742);
