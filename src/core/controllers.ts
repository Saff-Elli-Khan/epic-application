/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildTemplate> {{ child }}, </ControllerChildTemplate> */

import {
  ParentController,
  Get,
  CreateResponse,
} from "@saffellikhan/epic-express";
import { ConfigManager } from "@saffellikhan/epic-cli";
/* @ImportsContainer */
/* /ImportsContainer */

@ParentController("/", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
export class indexController {
  @Get("/")
  public APIHome() {
    // Get API Details
    const APIDetails = ConfigManager.getConfig("main");

    // Return API Details
    return new CreateResponse(`The API is online listening to the requests!`, {
      name: APIDetails.name,
      description: APIDetails.description,
      brand: APIDetails.brand,
    });
  }
}
