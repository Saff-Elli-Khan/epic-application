import e from "@oridune/validator";
import {
  Request,
  Controller,
  CreateResponse,
  Get,
  Post,
} from "@saffellikhan/epic-express";
import { LoadChildControllers } from "@App/exports";
import { CREATED } from "http-status";

@Controller("<<RouteNamespace>>", {
  /** Do not change the following code. */
  childs: LoadChildControllers(__dirname, `<<FileName>>`),
  /* --------------------------------- */
})
export class SampleController {
  @Post("/", "Create Something...")
  async CreateSample(req: Request) {
    // Query Validation
    const Query = await e
      .object({}, { strict: false })
      .validate(req.query, { label: "Sample::query" });

    /**
     * It is recommended to keep the following validators in place even if you don't want to validate any data.
     * It will prevent the client from injecting unexpected data into the request.
     *
     * */

    // Params Validation
    const Params = await e
      .object({})
      .validate(req.params, { label: "Sample::params" });

    // Body Validation
    const Body = await e
      .object({})
      .validate(req.body, { label: "Sample::body" });

    // Start coding here...

    // Return Response
    return new CreateResponse(
      "Something great has been created successfully!"
    ).httpCode(CREATED);
  }

  @Get("/", "Get Something...")
  async GetSample(req: Request) {
    // Query Validation
    const Query = await e
      .object({}, { strict: false })
      .validate(req.query, { label: "Sample::query" });

    /**
     * It is recommended to keep the following validators in place even if you don't want to validate any data.
     * It will prevent the client from injecting unexpected data into the request.
     *
     * */

    // Params Validation
    const Params = await e
      .object({})
      .validate(req.params, { label: "Sample::params" });

    // Start coding here...

    // Return Response
    return new CreateResponse("Something great has been fetched successfully!");
  }
}
