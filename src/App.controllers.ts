/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildTemplate> {{ child }}, </ControllerChildTemplate> */

import { ParentController, Get } from "@saffellikhan/epic-express";
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
    return `The API is online listening to the requests!`;
  }
}
