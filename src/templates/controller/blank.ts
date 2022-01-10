/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildsListTemplate> [{{ childs }}], </ControllerChildsListTemplate> */

import {
  Request,
  Controller,
  Use,
  CreateResponse,
  Post,
} from "@saffellikhan/epic-express";
import { LocalSettings } from "@AppPath/helpers/middlewares";
/* @ImportsContainer */
/* /ImportsContainer */

@Controller("<<ControllerPrefix>>", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
@Use(LocalSettings("<<AppName>>"))
export class SampleController {
  @Post("/", "Create Something...")
  async Sample(req: Request) {
    // Params Validation
    await req.validator.validate(req.params).schema({}).exec();

    // Body Validation
    await req.validator.validate(req.body).schema({}).exec();

    // Return Response
    return new CreateResponse("Something great has been done successfully!");
  }
}
