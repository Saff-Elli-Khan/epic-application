import {
  ParentController,
  Get,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import Path from "path";
import Fs from "fs";

@ParentController("/", {
  childs: Fs.readdirSync(Path.join(process.cwd(), "./src/controllers/"))
    .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
    .map(
      (filename) =>
        require(Path.join(process.cwd(), `./src/controllers/${filename}`))[
          filename.replace(/\.(ts|js)$/, "") + "Controller"
        ]
    ),
})
export class RootController {
  @Get("/", { authType: "none" })
  public APIHome(_: Request, res: Response) {
    // Get API Details
    delete res.locals.useragent;

    // Return API Details
    return new CreateResponse(
      `The API is online listening to the requests!`,
      res.locals
    );
  }
}
