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
    // Params Validation
    await req.validator.validate(req.params).schema({}).exec();

    // Body Validation
    await req.validator.validate(req.body).schema({}).exec();

    // Return Response
    return new CreateResponse("Something great has been done successfully!");
  }
}
