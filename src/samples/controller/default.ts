import {
  Request,
  Controller,
  CreateResponse,
  Get,
  Post,
  Patch,
  Delete,
} from "@saffellikhan/epic-express";
import { createSchema } from "@saffellikhan/epic-sql";
import { Validator } from "../../App.validator";

// @Temporary
const Sample: any = {};
// @/Temporary

@Controller("{ControllerPrefix}")
export class SampleController {
  @Get()
  async FindSample(req: Request) {
    // Request Validation
    await Validator.validate(req)
      .schema({
        params: (_) =>
          _.schema({
            SampleId: (_) =>
              _.optional({ checkFalsy: true, setUndefined: true }).isString(
                "Please provide a valid Sample ID!"
              ),
          }),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Find Sample
    const Result = await (req.params.SampleId
      ? Repository().where({
          SampleId: req.params.SampleId,
        })
      : Repository().search(req.query.search as string)
    ).select();

    // Result Validation
    if (!Result) throw new Error("We did not found that Sample!");

    // Return Response
    return new CreateResponse("Sample fetched successfully!", Result);
  }

  @Post()
  async CreateSample(req: Request) {
    // Request Validation
    await Validator.validate(req)
      .schema({
        params: (_) => _.schema({}),
        body: (_) => _.schema({}),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Return Response
    return new CreateResponse(
      "Sample created successfully!",
      // Create New Sample
      await Repository().create(createSchema(Sample, req.body))
    );
  }

  @Patch()
  async UpdateSample(req: Request) {
    // Request Validation
    await Validator.validate(req)
      .schema({
        params: (_) =>
          _.schema({
            SampleId: (_) =>
              _.optional({ checkFalsy: true, setUndefined: true }).isString(
                "Please provide a valid Sample ID!"
              ),
          }),
        body: (_) => _.schema({}),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Return Response
    return new CreateResponse(
      "Sample(s) updated successfully!",
      // Create New Sample
      await Repository()
        .where({
          SampleId: req.params.SampleId,
        })
        .update(createSchema(Sample, req.body))
    );
  }

  @Delete()
  async DeleteSample(req: Request) {
    // Request Validation
    await Validator.validate(req)
      .schema({
        params: (_) =>
          _.schema({
            SampleId: (_) =>
              _.optional({ checkFalsy: true, setUndefined: true }).isString(
                "Please provide a valid Sample ID!"
              ),
          }),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Return Response
    return new CreateResponse(
      "Sample(s) deleted successfully!",
      // Create New Sample
      await Repository()
        .where({
          SampleId: req.params.SampleId,
        })
        .delete()
    );
  }
}
