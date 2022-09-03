"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
// Load Environment Variables
require("dotenv").config({
  path: path_1.default.join(
    process.cwd(),
    `./env/.${process.env.NODE_ENV}.env`
  ),
});
