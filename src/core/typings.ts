import { DatabaseSession } from "@oridune/epic-odm";
import { CreateResponse } from "@saffellikhan/epic-express";
import { SuperTest, Test } from "supertest";
import { GeoData, TokensManager } from "./globals";
import { Validator } from "./validator";

// Override Express Interfaces
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

      /** Database Connection Session */
      database: DatabaseSession<any>;

      /** Get Validator Instance */
      validator: typeof Validator;

      /** Get Tokens Manager Instance */
      tokens: typeof TokensManager;

      /** Access Geo Data */
      geo: typeof GeoData;

      /** Get Current Response Object */
      response?: CreateResponse;

      /** Raw Body */
      rawBody: Buffer;
    }
  }
}
