import { DatabaseSession } from "@oridune/epic-odm";
import { CreateResponse, DefaultResponse } from "@saffellikhan/epic-express";
import { Translation, Translator } from "epic-translate";
import { SuperTest, Test } from "supertest";
import { GeoData } from "./geo";
import { TokensManager } from "./tokens";
import Redis from "ioredis";

// Override Typings
declare global {
  namespace NodeJS {
    interface Global {
      /** Database Connection Session */
      database: DatabaseSession<any>;

      /** Supertest Client for Testing */
      supertest: SuperTest<Test>;
    }
  }

  namespace Express {
    interface Request {
      /** Get Current Request ID */
      id: string;

      /** Get Current Request Controller Name */
      name: string;

      /** Get User's IP Address */
      clientIp: string;

      /** Current User Permission List */
      permissions?: string[];

      /** Redis Client */
      redis?: Redis;

      /** Database Connection Session */
      database: DatabaseSession<any>;

      /** Get Translator Session */
      translator: Translator<Translation<string, string>>;

      /** Get Tokens Manager Instance */
      tokens: typeof TokensManager;

      /** Access Geo Data */
      geo: typeof GeoData;

      /** Get Current Response Object */
      response?: CreateResponse;

      /** Format Current Response Object */
      responseFormat?: (response: DefaultResponse<boolean, any>) => any;

      /** Raw Body */
      rawBody: Buffer;
    }
  }
}
