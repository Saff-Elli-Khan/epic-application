import { ParentController, Get } from "@saffellikhan/epic-express";
import { Configuration } from "../App.globals";

@ParentController("/", {
  childs: /* @IndexControllerChilds */ [] /* /IndexControllerChilds */,
})
export class IndexController {
  @Get("/")
  public Index() {
    return `The ${
      Configuration().PACKAGE.brand.name
    }'s API is online listening to the requests!`;
  }
}
