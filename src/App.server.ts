import { HTTP, EpicApplication } from "epic-express";
import { Middlewares } from "./App.middlewares";

// Create Application
export class Application extends EpicApplication {
  _beforeInit = () => {
    Middlewares(this.Framework);
  };
}

// Start Application Server
new HTTP(new Application()).listen(process.env.PORT || 8080);
