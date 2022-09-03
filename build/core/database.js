"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseAdapter = void 0;
const common_1 = require("../common");
const epic_odm_1 = require("@oridune/epic-odm");
const loaders_1 = require("./helpers/loaders");
// Create Database Adapter
exports.DatabaseAdapter = new epic_odm_1.MongoDBAdapter(
  (0, loaders_1.LoadModules)("model"),
  process.env.DATABASE_URL ||
    "mongodb://localhost:27017/" + process.env.NODE_ENV,
  {},
  process.env.NODE_ENV !== common_1.NODE_ENV.PRODUCTION
);
