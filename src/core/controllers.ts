import {
  RootController,
  Get,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
import Path from "path";
import Fs from "fs";
import { Configuration } from "./globals";

@RootController("/", {
  childs: [
    // Load Plugins
    ...Object.keys(Configuration.plugins).reduce<(new () => any)[]>(
      (items, pluginName) => [
        ...items,
        ...(!Configuration.plugins[pluginName].disabled
          ? Fs.readdirSync(
              Path.join(
                process.cwd(),
                `./node_modules/${pluginName}/build/controllers/`
              )
            )
              .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
              .map(
                (filename) =>
                  require(Path.join(
                    process.cwd(),
                    `./node_modules/${pluginName}/build/controllers/${filename}`
                  ))[filename.replace(/\.(ts|js)$/, "") + "Controller"]
              )
          : []),
      ],
      []
    ),

    // Local Imports
    ...(!Configuration.disabled
      ? Fs.readdirSync(Path.join(process.cwd(), "./src/controllers/"))
          .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
          .map(
            (filename) =>
              require(Path.join(
                process.cwd(),
                `./src/controllers/${filename}`
              ))[filename.replace(/\.(ts|js)$/, "") + "Controller"]
          )
      : []),
  ],
})
export class MainController {
  @Get("/api/", {
    authType: "none",
    description: "Get the API details and metadata.",
  })
  async APIHome(_: Request, res: Response) {
    // Get API Details
    delete res.locals.useragent;

    // Return API Details
    return new CreateResponse(
      `The API is online listening to the requests!`,
      res.locals
    );
  }
}
