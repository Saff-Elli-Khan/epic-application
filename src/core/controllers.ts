/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildTemplate> {{ child }}, </ControllerChildTemplate> */

import {
  ParentController,
  Get,
  Request,
  Response,
  CreateResponse,
  Use,
} from "@saffellikhan/epic-express";
import { ConfigManager } from "@saffellikhan/epic-cli";
import { LocalSettings } from "./helpers/middlewares";
/* @ImportsContainer */
/* /ImportsContainer */

@ParentController("/", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
@Use(LocalSettings(require("../../package.json").name))
export class indexController {
  @Get("/", { authType: "none" })
  public APIHome(_: Request, res: Response) {
    // Get API Details
    const APIDetails = ConfigManager.getConfig("main");
    delete res.locals.useragent;

    // Return API Details
    return new CreateResponse(`The API is online listening to the requests!`, {
      name: APIDetails.name,
      description: APIDetails.description,
      brand: APIDetails.brand,
      ...res.locals,
    });
  }
}
