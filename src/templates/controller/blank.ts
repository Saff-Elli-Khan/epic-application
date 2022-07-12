import {
  Request,
  Controller,
  CreateResponse,
  Get,
  Post,
} from "@saffellikhan/epic-express";
import { LoadChildControllers } from "@App/exports";

@Controller("<<RouteNamespace>>", {
  /** Do not change the following code. */
  childs: LoadChildControllers(__dirname, `<<FileName>>`),
  /* --------------------------------- */
})
export class SampleController {
  @Post("/", "Create Something...")
  async CreateSample(req: Request) {
    // Query Validation
    await req.validator
      .validate(req.query)
      .schema({}, { strict: false })
      .exec();

    /**
     * It is recommended to keep the following validators in place even if you don't want to validate any data.
     * It will prevent the client from injecting unexpected data into the request.
     *
     * */

    // Params Validation
    await req.validator.validate(req.params).schema({}).exec();

    // Body Validation
    await req.validator.validate(req.body).schema({}).exec();

    // Start coding here...

    // Return Response
    return new CreateResponse("Something great has been done successfully!");
  }

  @Get("/", "Get Something...")
  async GetSample(req: Request) {
    // Query Validation
    await req.validator
      .validate(req.query)
      .schema({}, { strict: false })
      .exec();

    /**
     * It is recommended to keep the following validators in place even if you don't want to validate any data.
     * It will prevent the client from injecting unexpected data into the request.
     *
     * */

    // Params Validation
    await req.validator.validate(req.params).schema({}).exec();

    // Start coding here...

    // Return Response
    return new CreateResponse("Something great has been fetched successfully!");
  }
}
