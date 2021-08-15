/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildTemplate> {{ child }}, </ControllerChildTemplate> */

import { ParentController, Get } from "@saffellikhan/epic-express";
import { Configuration } from "../App.globals";
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
  public Home() {
    return `The ${
      Configuration().PROJECT.brand.name
    }'s API is online listening to the requests!`;
  }
}
