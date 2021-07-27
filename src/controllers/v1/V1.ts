import { Controller, Request, Get } from "@saffellikhan/epic-express";

@Controller("/v1/", {
  childs: /* @V1ControllerChilds */ [] /* /V1ControllerChilds */,
})
export class V1Controller {
  @Get()
  public Stats(req: Request) {
    return "Hello World from API version 1!";
  }
}
