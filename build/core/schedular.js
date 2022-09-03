"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schedule = void 0;
const epic_schedular_1 = require("@saffellikhan/epic-schedular");
const redis_1 = require("./redis");
// Create a Cron Scheduler Instance
exports.Schedule = new epic_schedular_1.Schedular({
  name: require("../../package.json").name,
  redis: redis_1.RedisClient,
});
