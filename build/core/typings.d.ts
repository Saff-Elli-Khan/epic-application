/// <reference types="node" />
import { CreateResponse, DefaultResponse } from "@saffellikhan/epic-express";
import { DatabaseSession } from "@oridune/epic-odm";
import { Redis } from "ioredis";
import { Translation, Translator } from "epic-translate";
import { SuperTest, Test } from "supertest";
import { SecurityManager } from "./lib/security";
import { GeoData } from "./geo";
import { TokensManager } from "./tokens";
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
            name?: string;
            /** Get User's IP Address */
            clientIp: string;
            /** Security Manager */
            security: SecurityManager;
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
            /** Set Debug Information */
            debugInfo: Record<string, any>;
        }
    }
}
declare module "http" {
    interface IncomingMessage {
        rawBody: Buffer;
    }
}
