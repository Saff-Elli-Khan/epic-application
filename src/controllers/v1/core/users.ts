import { Request, Get, ChildController } from "epic-express";

@ChildController("/users/")
export class UsersController {
  @Get()
  public find(req: Request) {
    return "User(s) fetched successfully!";
  }
}
