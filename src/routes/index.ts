import { Router } from "express";
import { CoreHelpers } from "../helpers/core";

// Load APIs
import V1 from "./v1";

export default Router()
  .get("/", async (_, res) =>
    res.json(
      await CoreHelpers.response(
        false,
        `Please choose your desired API version!`
      )
    )
  )
  .use("/v1/", V1);
