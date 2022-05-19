import {
  Request,
  Controller,
  CreateResponse,
  Post,
} from "@saffellikhan/epic-express";
import Path from "path";
import Fs from "fs";

@Controller("<<RouteNamespace>>", {
  childs: Fs.readdirSync(__dirname)
    .filter((filename) =>
      new RegExp(`^<<FileName>>.[A-Z]\\w+\\.(ts|js)$`).test(filename)
    )
    .map(
      (filename) =>
        require(Path.join(__dirname, filename))[
          filename.replace(/\.(ts|js)$/, "").replace(".", "") + "Controller"
        ]
    ),
})
export class SampleController {
  @Post("/", "Create Something...")
  async Sample(req: Request) {
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
}
