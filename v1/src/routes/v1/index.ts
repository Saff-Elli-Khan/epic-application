import { Router } from "express";
import { CoreHelpers } from "../../helpers/core";
import { GatewayManager } from "../../App.globals";
import { CoreMiddlewares } from "../../middlewares/core";

// Child Routes
import LocalAuthRoutes from "./core/auth";
import UsersRoutes from "./core/users";
import NotificationsRoutes from "./core/notifications";

export default Router()
  .use(CoreMiddlewares.useVersion("v1"))
  .get("/", async (req, res) =>
    res.json(
      await CoreHelpers.response(
        true,
        `Hello world from API (${req.version})!`,
        {
          payments: {
            methods: GatewayManager.listMethods(),
          },
        }
      )
    )
  )
  .use("/auth/local/", LocalAuthRoutes)
  .use("/users/", UsersRoutes)
  .use("/notifications/", NotificationsRoutes);
