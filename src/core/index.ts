import "./loadEnv";
import "./logger";
import { HTTPServer } from "./server";

// Start Application Server
HTTPServer.listen(process.env.PORT || 3742);
