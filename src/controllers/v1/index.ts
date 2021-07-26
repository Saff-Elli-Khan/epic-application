import { Controller, Request, Get } from "epic-express";
import { UsersController } from "./core/users";

@Controller("/v1/", { childs: [UsersController] })
export class V1Controller {
  @Get()
  public Stats(req: Request) {
    return "Hello World from API version 1!";
  }
}
