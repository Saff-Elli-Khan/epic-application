/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildsListTemplate> [{{ childs }}], </ControllerChildsListTemplate> */

import {
  Request,
  Controller,
  CreateResponse,
  Post,
} from "@saffellikhan/epic-express";
import { Validator } from "@AppPath/App.validator";
/* @ImportsContainer */
/* /ImportsContainer */

@Controller("{ControllerPrefix}", {
  childs:
    /* @ControllerChildsContainer */
    /* <SampleControllerChilds[ControllerChildsListTemplate]> */
    [],
  /* </SampleControllerChilds> */
  /* /ControllerChildsContainer */
})
export class SampleController {
  @Post("/", "Create an Action.")
  async doAction(req: Request) {
    // Params Validation
    await Validator.validate(req.params).schema({}).exec();

    // Body Validation
    await Validator.validate(req.body).schema({}).exec();

    // Return Response
    return new CreateResponse("Something great has been successfully done!");
  }
}
