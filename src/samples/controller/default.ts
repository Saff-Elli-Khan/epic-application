import {
  Request,
  Controller,
  CreateResponse,
  Get,
  Post,
  Patch,
  Delete,
} from "@saffellikhan/epic-express";
import { Validator } from "@App/App.validator";

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
            ["SampleId"]: (_) =>
              _.optional({ checkFalsy: true, setUndefined: true }).isString(
                "Please provide a valid Sample ID!"
              ),
          }),
      })
      .exec();

    // Create New Repository
    const Repository = req.database.use(Sample);

    // Find Sample
    const Result = await (req.params["SampleId"]
      ? Repository().where({
          ["SampleId"]: req.params["SampleId"],
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
    return "Sample created successfully!";
  }

  @Patch()
  async UpdateSample(req: Request) {
    return "Sample(s) updated successfully!";
  }

  @Delete()
  async DeleteSample(req: Request) {
    return "Sample(s) deleted successfully!";
  }
}
