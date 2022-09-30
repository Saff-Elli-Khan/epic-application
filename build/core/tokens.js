"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokensManager = void 0;
const common_1 = require("../common");
const epic_tokens_1 = require("epic-tokens");
const redis_1 = require("./redis");
// Global Tokens Manager
exports.TokensManager = new epic_tokens_1.EpicTokens(() => process.env.ENCRYPTION_KEY || "nb4ZHjgVgu0BtM83K97ZNyw8934xUp2Z", {
    redis: redis_1.RedisClient,
    issuer: common_1.AppName,
})
    .onEncode((token) => encodeURIComponent(token))
    .onDecode((token) => decodeURIComponent(token));
