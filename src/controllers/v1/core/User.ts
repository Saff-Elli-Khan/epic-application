import { Request, Get, ChildController } from "@saffellikhan/epic-express";

@ChildController("/user/")
export class UserController {
  @Get()
  public find(req: Request) {
    return "User(s) fetched successfully!";
  }
}
