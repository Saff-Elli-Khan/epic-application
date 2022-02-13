/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildTemplate> {{ child }}, </ControllerChildTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import {
  Request,
  Controller,
  CreateResponse,
  Post,
} from "@saffellikhan/epic-express";

@Controller("<<ControllerPrefix>>", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
export class SampleController {
  @Post("/", "Create Something...")
  async Sample(req: Request) {
    // Query Validation
    await req.validator
      .validate(req.query)
      .schema({}, { strict: false })
      .exec();

    // Params Validation
    await req.validator.validate(req.params).schema({}).exec();

    // Body Validation
    await req.validator.validate(req.body).schema({}).exec();

    // Return Response
    return new CreateResponse("Something great has been done successfully!");
  }
}
