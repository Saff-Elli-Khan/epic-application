/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildTemplate> {{ child }}, </ControllerChildTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import {
  ParentController,
  Get,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";

@ParentController("/", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
export class indexController {
  @Get("/", { authType: "none" })
  public APIHome(req: Request, res: Response) {
    // Get API Details
    delete res.locals.useragent;

    // Return API Details
    return new CreateResponse(`The API is online listening to the requests!`, {
      name: req.config.name,
      description: req.config.description,
      brand: req.config.brand,
      ...res.locals,
    });
  }
}
