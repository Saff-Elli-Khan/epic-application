import { Request, Response, NextFunction } from "express";
import { IpFilter } from "express-ipfilter";
import { getClientIp } from "@supercharge/request-ip";
import { compose } from "compose-middleware";
import { Configuration, TokensManager } from "../App.globals";
import Fs from "fs";
import Glob from "glob";

export class CoreMiddlewares {
  static useVersion = (version: string) => async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    req.version = version;

    next();
  };

  static useAuthorization = () => async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    try {
      if (typeof req.headers["authorization"] !== "string") return next();

      // Split Token
      const Authorization = req.headers["authorization"].split(" ");

      // Get Token Details
      const GrantType = Authorization[0];
      const GrantToken = Authorization[1];

      if (GrantType.toLowerCase() !== "bearer")
        throw new Error(`Invalid Authorization Grant Type has been provided!`);

      // Verify Authorization Token
      req.authorization = await TokensManager.verify({
        type: "Authorization",
        token: GrantToken,
      });

      next();
    } catch (error) {
      next(error);
    }
  };

  static usePermissions = () => async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    // Resolve Permissions
    req.permissions = req.authorization
      ? req.authorization.payload.permissions.data
      : Configuration().USERS.permissions.unauthenticated;

    next();
  };

  static useLanguage = () => async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    // Default Language
    const DefaultLanguage = Configuration().LANGUAGES[0].code;

    // Get & Resolve Language From Request
    const CurrentLanguage = (req.headers["accept-language"] || DefaultLanguage)
      .toString()
      .toLowerCase();

    // Validate Language
    if (
      Configuration()
        .LANGUAGES.map((language) => language.code)
        .includes(CurrentLanguage)
    )
      req.language = CurrentLanguage;
    else
      return next(
        new Error(
          `Invalid Language '${CurrentLanguage.toUpperCase()}' has been provided!`
        )
      );
    next();
  };

  static useCurrency = () => async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    // Default Currency
    const DefaultCurrency = Configuration().CURRENCIES[0].code;

    // Get & Resolve Currency From Request
    const CurrentCurrency = (req.headers["accept-currency"] || DefaultCurrency)
      .toString()
      .toLowerCase();

    // Validate Currency
    if (
      Configuration()
        .CURRENCIES.map((currency) => currency.code)
        .includes(CurrentCurrency)
    )
      req.currency = CurrentCurrency;
    else
      return next(
        new Error(
          `Invalid Currency '${CurrentCurrency.toUpperCase()}' has been provided!`
        )
      );
    next();
  };

  static useDate = () => async (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    if (req.headers["date"]) req.date = new Date(req.headers["date"]);
    next();
  };

  static useIPAddress = () => (
    req: Request,
    _: Response,
    next: NextFunction
  ) => {
    req.clientIp = getClientIp(req) || "0.0.0.0/0";
    next();
  };

  static useIPFilter = (ips: string[]) => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Check if IP Security Enabled
    if (Configuration().SECURITY.ip.enabled)
      IpFilter([...Configuration().SECURITY.ip.allowedIps, ips], {
        ...Configuration().SECURITY.ip,
        detectIp: () => req.clientIp,
        log: Configuration().DEBUGING,
      })(req, res, next);
    else next();
  };

  static useIf = (
    callback: (req: Request, res: Response) => boolean,
    successMiddlwares:
      | Array<(req: Request, res: Response, next: NextFunction) => any>
      | ((req: Request, res: Response, next: NextFunction) => any),
    failedMiddlwares:
      | Array<(req: Request, res: Response, next: NextFunction) => any>
      | ((req: Request, res: Response, next: NextFunction) => any) = []
  ) => (req: Request, res: Response, next: NextFunction) => {
    const Middlewares = callback(req, res)
      ? successMiddlwares
      : failedMiddlwares;

    // Compose Middlewares
    compose(
      ...((Middlewares instanceof Array ? Middlewares : [Middlewares]) as Array<
        any
      >)
    )(req, res, next);
  };

  static useStatic = (path: string) => async (
    req: Request,
    res: Response,
    next: NextFunction
  ) =>
    Glob(path + "/**/*", (error, matches) => {
      if (!error) {
        if (typeof req.params[0] === "string") {
          const Matches = matches.map((match) =>
            match.replace(path.replace(/\\/g, "/"), "")
          );
          const File = req.params[0]
            .split("/")
            .filter((v) => v)
            .join("/");

          if (Matches.includes(File)) {
            const FilePath = matches[Matches.indexOf(File)];
            if (Fs.statSync(FilePath).isDirectory())
              next(new Error(`Not Found`));
            else res.sendFile(FilePath);
          } else next(new Error(`Not Found`));
        } else next(new Error(`No Parameters Found!`));
      } else next(error);
    });

  static useFinalTasks = (callback: (req: Request) => void) => (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // Do Some Tasks At The End of Request
    res.on("close", () => callback(req));
    next();
  };
}
