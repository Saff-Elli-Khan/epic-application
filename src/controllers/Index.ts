import { ParentController, Get } from "@saffellikhan/epic-express";
import { Configuration } from "../App.globals";

@ParentController("/", {
  childs: /* @indexControllerChilds */ [] /* /indexControllerChilds */,
})
export class indexController {
  @Get("/")
  public Home() {
    return `The ${
      Configuration().PACKAGE.brand.name
    }'s API is online listening to the requests!`;
  }
}
