/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerTemplate> {{ child }}, </ControllerTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import {
  ParentController,
  Get,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { ImportControllers } from "./imports";

@ParentController("/", {
  childs: [
    ...ImportControllers(),

    /* @ControllersContainer */
    /* /ControllersContainer */
  ],
})
export class indexController {
  @Get("/", { authType: "none" })
  public APIHome(_: Request, res: Response) {
    // Get API Details
    delete res.locals.useragent;

    // Return API Details
    return new CreateResponse(
      `The API is online listening to the requests!`,
      res.locals
    );
  }
}
