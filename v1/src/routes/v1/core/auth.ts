import { Router } from "express";
import { AuthController } from "../../../controllers/v1";
import { CoreHelpers } from "../../../helpers/core";

/**
 *
 * Create Auth Controller Instances
 * Create Routes
 */

const Controller = new AuthController();

export default Router()
  .post("/", CoreHelpers.isPermitted("Auth", "Create"), Controller.create())
  .patch("/", CoreHelpers.isPermitted("Auth", "Update"), Controller.update())
  .delete("/", CoreHelpers.isPermitted("Auth", "Delete"), Controller.delete());
