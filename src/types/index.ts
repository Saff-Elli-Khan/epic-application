import { EpicSQLManager } from "@saffellikhan/epic-sql";
import { SchemaList } from "../schemas/index";
import { IpFilterOptions } from "express-ipfilter";

export interface PackageInterface {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
}

export interface UploadsConfigInterface {
  directory: string;
  allowedMimeTypes: string[];
  allowedFileSize: number;
}

export interface SecurityConfigInterface {
  encryption: {
    key: string;
  };
  ip: IpFilterOptions & { enabled: boolean; allowedIps: string[] };
}

export interface UsersConfigInterface {
  default: string;
  subscription: {
    type: "Email" | "Contact";
  };
  tokens: {
    authorization: {
      expiry: number;
    };
  };
}

export interface LanguageInterface {
  name: string;
  code: string;
  nativeName: string;
}

export interface CurrencyInterface {
  code: string;
  name: string;
  rate: null | number;
  symbol: string;
  image: string;
}

// Override Express Interfaces
declare module "express-serve-static-core" {
  interface Request {
    id: string;
    name: string;
    permissions: string[];
    clientIp: string;
    language: string;
    currency: string;
    database: EpicSQLManager<any, typeof SchemaList>;
  }
}
