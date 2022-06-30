import { EpicGeo } from "epic-geo";
import { EpicTokens } from "epic-tokens";
import { Schedular } from "@saffellikhan/epic-schedular";
import EventEmitter from "events";
import Redis from "ioredis";
import Path from "path";

// Load Environment Variables
require("dotenv").config({
  path: Path.join(process.cwd(), `./env/.${process.env.NODE_ENV}.env`),
});

// Create Event Emitter Instance
export const Events = new EventEmitter();

// Geo Data Library
export const GeoData = new EpicGeo();

// Inject Environment Variables into objects
const InjectEnv = <T extends Record<string, any>>(object: T): T => {
  for (const Key in object) {
    // Get Value
    const Value = object[Key];
    if (typeof Value === "string") {
      // Resolve if value is an Object
      const MatchObject =
        /(object|boolean|number|string|list)\(\s*\{\s*\{\s*(\w+)\s*\}\s*\}\s*\)/.exec(
          Value
        );

      if (MatchObject) {
        if (MatchObject[1] === "object")
          object[Key] = JSON.parse(process.env[MatchObject[2]] || "{}");
        else if (MatchObject[1] === "boolean")
          object[Key] = ["1", "true"].includes(
            (process.env[MatchObject[2]] || "").toString().toLowerCase()
          ) as any;
        else if (MatchObject[1] === "number")
          object[Key] = parseFloat(process.env[MatchObject[2]] || "") as any;
        else if (MatchObject[1] === "string")
          object[Key] = process.env[MatchObject[2]] as any;
        else if (MatchObject[1] === "list")
          object[Key] = (process.env[MatchObject[2]] || "")
            .split(",")
            .map((_) => _.trim()) as any;
        else
          object[Key] = Value.replace(
            /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
            (_: string, key: string) => process.env[key]
          ) as any;
      } else
        object[Key] = Value.replace(
          /\{\s*\{\s*(\w+)\s*\}\s*\}/g,
          (_: string, key: string) => process.env[key]
        );
    } else if (typeof Value === "object" && Value !== null)
      object[Key] = InjectEnv(Value);
  }

  return object;
};

// Get Epic Configuration
export const Configuration = InjectEnv(
  require(Path.join(process.cwd(), "./package.json")).epic || {}
);

// Create Redis Client
export const RedisClient = process.env.REDIS_HOST
  ? new Redis({
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT || "6379"),
      username: process.env.REDIS_USERNAME,
      password: process.env.REDIS_PASSWORD,
    })
  : undefined;

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => process.env.ENCRYPTION_KEY || "nb4ZHjgVgu0BtM83K97ZNyw8934xUp2Z",
  { redis: RedisClient }
);

// Create a Cron Scheduler Instance
export const Schedule = new Schedular({
  name: require("../../package.json").name,
  redis: RedisClient,
});
