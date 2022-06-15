import {
  RootController,
  Get,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { LoadModules } from "./helpers";

@RootController("/", {
  childs: LoadModules("controller"),
})
export class MainController {
  @Get("/api/", {
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
