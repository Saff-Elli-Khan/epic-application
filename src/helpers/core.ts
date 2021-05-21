import { Request, Response, NextFunction } from "express";
import { PermissionsException } from "epic-permissions-manager";
import { PermissionsManager, Validator } from "../App.globals";
import { DropFirstParameter } from "../typings";

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

export type ControllerReturn =
  | string
  | [string, any]
  | [string, any, number]
  | void;

export class CoreHelpers {
  static controller = (
    Middleware: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<ControllerReturn> | ControllerReturn
  ) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await Validator.validate(req.query)
        .schema({
          search: (_) =>
            _.optional({ checkFalsy: true, setUndefined: true }).isString(
              "Please provide a valid search string!"
            ),
          filter: (_) =>
            _.optional({ checkFalsy: true, setUndefined: true }).isString(
              "Please provide a valid filter string!"
            ),
          offset: (_) =>
            _.optional()
              .isNumeric({ sanitize: true }, "Invalid offset number!")
              .isAmount({ min: 0 }, "Minimum offset is 0!"),
          limit: (_) =>
            _.optional().isNumeric({ sanitize: true }, "Invalid limit number!"),
          sort: (_) =>
            _.optional().isIn(
              ["ASC", "DESC"],
              `Sorting value should be 'ASC' Or 'DESC'!`
            ),
          relation: (_) =>
            _.optional()
              .isString("Please provide a valid comma separated string!")
              .custom((value: string) =>
                value
                  .trim()
                  .split(",")
                  .map((v) => v.trim())
                  .filter((v) => v)
              ),
          range: (_) =>
            _.optional()
              .likeArray(
                { sanitize: true },
                "Please provide a valid Time range!"
              )
              .each((_) =>
                _.isNumeric(
                  { sanitize: true },
                  "Please provide a valid Unix Time."
                )
              ),
        })
        .run();

      // Process Operations
      const Results = await Middleware(req, res, next);

      if (Results)
        // Callback with Response
        res.json(
          await CoreHelpers.response(
            true,
            Results instanceof Array ? Results[0] : Results,
            Results instanceof Array ? Results[1] : undefined,
            Results instanceof Array ? Results[2] : undefined
          )
        );
      else throw new Error(`No results from your current request!`);
    } catch (error) {
      return next(error);
    }
  };

  static response = async <B extends boolean, T>(
    status: B,
    messages: string | ValidationMessage | ValidationMessage[],
    data?: T,
    code?: number
  ): Promise<DefaultResponse<B, T>> => {
    // Resolve Messages
    if (typeof messages !== "object" && typeof messages !== "string")
      messages = status
        ? "The request was successful!"
        : "The request was failed!";

    // Format the Message
    if (typeof messages === "string") messages = { message: messages };
    else if (messages instanceof Error)
      messages = { message: messages.message };

    // Return Data
    return {
      status,
      messages: messages instanceof Array ? messages : [messages],
      data: data || ({} as T),
      code: code || (status ? 0 : 1),
    };
  };

  static isPermitted = (
    ...parameters: DropFirstParameter<
      Parameters<typeof PermissionsManager["isPermitted"]>
    >
  ) => async (req: Request, _: Response, next: NextFunction) =>
    next(
      PermissionsManager.isPermitted(req.permissions, ...parameters)
        ? undefined
        : new PermissionsException(
            `You don't have permissions for this request!`
          )
    );
}
