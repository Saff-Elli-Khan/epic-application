import { DatabaseSession } from "@oridune/epic-odm";
import { CreateResponse, DefaultResponse } from "@saffellikhan/epic-express";
import { Translation, Translator } from "epic-translate";
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
