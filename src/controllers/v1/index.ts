import { Controller, Request, Get } from "@saffellikhan/epic-express";
import { UserController } from "./core/User";

@Controller("/v1/", { childs: [UserController] })
export class V1Controller {
  @Get()
  public Stats(req: Request) {
    return "Hello World from API version 1!";
  }
}
