import "./loadEnv";
import { HTTPServer } from "./server";
import { Events } from "./events";

// Catch Logs
const Logger = console.log;
console.log = (...data: any[]) => {
  // Emit Event
  Events.emit("log_detected", ...data);

  // Log to Console
  Logger(...data);
};

// Start Application Server
HTTPServer.listen(process.env.PORT || 3742);
