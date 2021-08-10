/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerChildsListTemplate> [{{ childs }}], </ControllerChildsListTemplate> */

import {
  Request,
  Controller,
  CreateResponse,
  Get,
  Post,
  Patch,
  Delete,
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
  @Get("/", "Fetch a list of Sample(s).")
  async ListSample(req: Request) {
    // Return Response
    return new CreateResponse("Sample(s) fetched successfully!");
  }

  @Get("/:SampleId/", "Fetch the Sample.")
  async GetSample(req: Request) {
    // Params Validation
    await Validator.validate(req.params)
      .schema({
        SampleId: (_) =>
          _.optional({ checkFalsy: true, setUndefined: true }).isString(
            "Please provide a valid Sample ID!"
          ),
      })
      .exec();

    // Return Response
    return new CreateResponse("Sample fetched successfully!");
  }

  @Post("/", "Create a new Sample.")
  async CreateSample(req: Request) {
    // Params Validation
    await Validator.validate(req.params).schema({}).exec();

    // Body Validation
    await Validator.validate(req.body).schema({}).exec();

    // Return Response
    return new CreateResponse("Sample has been created successfully!");
  }

  @Patch("/:SampleId/", "Update the Sample.")
  async UpdateSample(req: Request) {
    // Params Validation
    await Validator.validate(req.params)
      .schema({
        SampleId: (_) =>
          _.optional({ checkFalsy: true, setUndefined: true }).isString(
            "Please provide a valid Sample ID!"
          ),
      })
      .exec();

    // Body Validation
    await Validator.validate(req.body).schema({}).exec();

    // Return Response
    return new CreateResponse("Sample has been updated successfully!");
  }

  @Delete("/:SampleId/", "Delete the Sample.")
  async DeleteSample(req: Request) {
    // Params Validation
    await Validator.validate(req.params)
      .schema({
        SampleId: (_) =>
          _.optional({ checkFalsy: true, setUndefined: true }).isString(
            "Please provide a valid Sample ID!"
          ),
      })
      .exec();

    // Return Response
    return new CreateResponse("Sample has been deleted successfully!");
  }
}
