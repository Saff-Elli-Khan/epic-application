"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisClient = void 0;
const ioredis_1 = __importDefault(require("ioredis"));
// Create Redis Client
exports.RedisClient = process.env.REDIS_HOST
    ? new ioredis_1.default({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || "6379"),
        username: process.env.REDIS_USERNAME,
        password: process.env.REDIS_PASSWORD,
    })
    : undefined;
