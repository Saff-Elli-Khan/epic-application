import { Router } from "express";
import { CoreHelpers } from "../../helpers/core";
import { GatewayManager } from "../../App.globals";

// Child Routes
import LocalAuthRoutes from "./core/auth";
import UsersRoutes from "./core/users";
import NotificationsRoutes from "./core/notifications";

export default Router()
  .get("/", async (_, res) =>
    res.json(
      await CoreHelpers.response(true, `Hello world from API (version 1)!`, {
        methods: GatewayManager.listMethods(),
      })
    )
  )
  .use("/auth/local/", LocalAuthRoutes)
  .use("/users/", UsersRoutes)
  .use("/notifications/", NotificationsRoutes);
