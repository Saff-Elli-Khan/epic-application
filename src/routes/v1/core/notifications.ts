import { Router } from "express";
import { NotificationsController } from "../../../controllers";
import { CoreHelpers } from "../../../helpers/core";
import { CoreMiddlewares } from "../../../middlewares/core";

/**
 *
 * Create Notifications Controller Instances
 * Create Routes
 */

const Controller = new NotificationsController();

export default Router().get(
  "/:userId/",
  CoreMiddlewares.useIf(
    (req) => req.params.userId === req.authorization?.payload?.userId,
    CoreHelpers.isPermitted("Notifications", "Search"),
    CoreHelpers.isPermitted("Public Notifications", "Search")
  ),
  Controller.search()
);
