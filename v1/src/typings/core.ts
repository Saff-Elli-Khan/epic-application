import { Request } from "express";
import { IpFilterOptions } from "express-ipfilter";

export interface PackageInterface {
  name: string;
  version: string;
  description: string;
  brand: {
    name: string;
    country: string;
    address: string;
  };
  author: string;
  license: string;
}

export interface UploadsConfigurationInterface {
  directory: string;
  allowedMimeTypes: string[];
  allowedFileSize: number;
}

export interface SecurityInterface {
  ip: IpFilterOptions & { enabled: boolean; allowedIps: string[] };
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

export interface ValidationMessage {
  param?: string;
  location?: string;
  message: string;
  value?: any;
}

export interface DefaultResponse<B extends boolean, T> {
  status: B;
  messages: Array<ValidationMessage>;
  data: T;
  code: number;
}

export type ControllerReturnType =
  | string
  | [string, any]
  | [string, any, number]
  | void;

export type ControllerEvent = (
  req: Request,
  res: DefaultResponse<true, any>
) => any;

export type ControllerErrorEvent = (req: Request, error: any) => any;

export interface ControllerEventsInterface {
  [Key: string]: {
    event: ControllerEvent;
    error: ControllerErrorEvent;
  };
}
