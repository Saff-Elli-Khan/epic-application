import { Schedular } from "@saffellikhan/epic-schedular";
import { RedisClient } from "./redis";

// Create a Cron Scheduler Instance
export const Schedule = new Schedular({
  name: require("../../package.json").name,
  redis: RedisClient,
});
