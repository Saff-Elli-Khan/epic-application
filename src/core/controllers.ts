import {
  Controller,
  RootController,
  Get,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { LoadModules } from "./helpers/loaders";

@Controller("/api/", {
  childs: LoadModules("controller"),
})
export class APIController {
  @Get("/", {
    authType: "none",
    description: "Get the API details and metadata.",
  })
  async APIHome(_: Request, res: Response) {
    // Get API Details
    delete res.locals.useragent;

    // Return API Details
    return new CreateResponse(
      `The API is online listening to the requests!`,
      res.locals
    );
  }
}

@RootController("/", {
  childs: [APIController],
})
export class AppController {
  @Get("/", {
    authType: "none",
    description: "Hello world from the app home.",
  })
  async AppHome(_: Request) {
    // Return API Details
    return new CreateResponse(
      `No resources exists here, Please navigate to the desired endpoint!`
    );
  }
}
