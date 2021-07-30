/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildsListTemplate> [{{ childs }}], </ControllerChildsListTemplate> */

import { ParentController, Get } from "@saffellikhan/epic-express";
import { Configuration } from "../App.globals";
/* @ImportsContainer */

/* /ImportsContainer */

@ParentController("/", {
  childs:
    /* @ControllerChildsContainer */
    /* <indexControllerChilds[ControllerChildsListTemplate]> */
    [],
  /* </indexControllerChilds> */
  /* /ControllerChildsContainer */
})
export class indexController {
  @Get("/")
  public Home() {
    return `The ${
      Configuration().PACKAGE.brand.name
    }'s API is online listening to the requests!`;
  }
}
