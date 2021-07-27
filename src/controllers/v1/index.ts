import { ChildController, Request, Get } from "@saffellikhan/epic-express";

@ChildController("/v1/", { childs: [] })
export class V1Controller {
  @Get()
  public Stats(req: Request) {
    return "Hello World from API version 1!";
  }
}
