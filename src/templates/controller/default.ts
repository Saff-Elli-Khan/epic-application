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
/* @ImportsContainer */
/* /ImportsContainer */

/* @Temporary */
const Sample: any = {};
/* /Temporary */

@Controller("<<ControllerPrefix>>", {
  childs: [
    /* @ControllerChildsContainer */
    /* /ControllerChildsContainer */
  ],
})
export class SampleController {
  @Get("/", "Fetch a list of Sample(s).")
  async listSample(req: Request) {
    // Create New Repository
    const Repository = req.database.use(Sample);

    // Search Sample
    const Result = await Repository()
      .search(req.query.search as string)
      .select();

    // Return Response
    return new CreateResponse("Sample(s) fetched successfully!", Result);
  }

  @Get("/:SampleId/", "Fetch the Sample.")
  async getSample(req: Request) {
    // Params Validation
    await req.validator
      .validate(req.params)
      .schema({
        SampleId: (_) =>
          _.optional({ falsy: true }).isString(
            "Please provide a valid Sample ID!"
          ),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Find A Sample
    const Result = await Repository()
      .where({ SampleId: req.params.SampleId })
      .select();

    // Result Validation
    if (!Result[0]) throw new Error("We did not found that Sample!");

    // Return Response
    return new CreateResponse("Sample fetched successfully!", Result[0]);
  }

  @Post("/", "Create a new Sample.")
  async createSample(req: Request) {
    // Params Validation
    await req.validator.validate(req.params).schema({}).exec();

    // Body Validation
    await req.validator.validate(req.body).schema({}).exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Return Response
    return new CreateResponse(
      "Sample has been created successfully!",
      // Create New Sample
      await Repository().create(Sample.new(req.body))
    );
  }

  @Patch("/:SampleId/", "Update the Sample.")
  async updateSample(req: Request) {
    // Params Validation
    await req.validator
      .validate(req.params)
      .schema({
        SampleId: (_) =>
          _.optional({ falsy: true }).isString(
            "Please provide a valid Sample ID!"
          ),
      })
      .exec();

    // Body Validation
    await req.validator.validate(req.body).schema({}).exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Return Response
    return new CreateResponse(
      "Sample has been updated successfully!",
      // Create New Sample
      await Repository()
        .where({
          SampleId: req.params.SampleId,
        })
        .update(Sample.new(req.body))
    );
  }

  @Delete("/:SampleId/", "Delete the Sample.")
  async deleteSample(req: Request) {
    // Params Validation
    await req.validator
      .validate(req.params)
      .schema({
        SampleId: (_) =>
          _.optional({ falsy: true }).isString(
            "Please provide a valid Sample ID!"
          ),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Return Response
    return new CreateResponse(
      "Sample has been deleted successfully!",
      // Create New Sample
      await Repository()
        .where({
          SampleId: req.params.SampleId,
        })
        .delete()
    );
  }
}
