import Path from "path";

// Load Environment Variables
require("dotenv").config({
  path: Path.join(process.cwd(), `./env/.${process.env.NODE_ENV}.env`),
});
