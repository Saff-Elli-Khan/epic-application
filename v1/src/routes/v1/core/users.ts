import { Router } from "express";
import { UsersController } from "../../../controllers/v1";
import { CoreHelpers } from "../../../helpers/core";
import { CoreMiddlewares } from "../../../middlewares/core";

/**
 *
 * Create Users Controller Instances
 * Create Routes
 */

const Controller = new UsersController();

export default Router()
  .post("/", CoreHelpers.isPermitted("Users", "Create"), Controller.create())
  .get("/", CoreHelpers.isPermitted("Users", "Search"), Controller.search())
  .get("/count/", CoreHelpers.isPermitted("Users", "Count"), Controller.count())
  .get("/:userId/", CoreHelpers.isPermitted("Users", "Get"), Controller.get())
  .patch(
    "/:userId/",
    CoreMiddlewares.useIf(
      (req) => req.params.userId === req.authorization?.payload?.userId,
      CoreHelpers.isPermitted("Self", "Update"),
      CoreHelpers.isPermitted("Users", "Update")
    ),
    Controller.update()
  );
