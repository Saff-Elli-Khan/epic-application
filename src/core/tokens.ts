import { AppName } from "@App/common";
import { EpicTokens } from "epic-tokens";
import { RedisClient } from "./redis";

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => process.env.ENCRYPTION_KEY || "nb4ZHjgVgu0BtM83K97ZNyw8934xUp2Z",
  {
    redis: RedisClient,
    issuer: AppName,
  }
)
  .onEncode((token) => encodeURIComponent(token))
  .onDecode((token) => decodeURIComponent(token));
