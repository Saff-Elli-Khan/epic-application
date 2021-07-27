/**
 *
 * Application Controllers
 * Import all your controllers here to run on the Application
 *
 */

import { ParentController, Get } from "@saffellikhan/epic-express";
import { Configuration } from "../App.globals";
import { V1Controller } from "./v1";

@ParentController("/", {
  childs: [V1Controller],
})
export class APIController {
  @Get("/")
  public Stats() {
    return `The ${
      Configuration().PACKAGE.brand.name
    }'s API is online listening to the requests!`;
  }
}
