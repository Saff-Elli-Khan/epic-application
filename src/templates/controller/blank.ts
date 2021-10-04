/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildsListTemplate> [{{ childs }}], </ControllerChildsListTemplate> */

import {
  Request,
  Controller,
  CreateResponse,
  Post,
} from "@saffellikhan/epic-express";
/* @ImportsContainer */
/* /ImportsContainer */

@Controller("<<ControllerPrefix>>", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
export class SampleController {
  @Post("/", "Create an Action.")
  async doAction(req: Request) {
    // Return Response
    return new CreateResponse("Something great has been successfully done!");
  }
}
