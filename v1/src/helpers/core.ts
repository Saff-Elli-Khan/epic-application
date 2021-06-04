import { Request, Response, NextFunction } from "express";
import { PermissionsException } from "epic-permissions-manager";
import { PermissionsManager } from "../App.globals";
import {
  ControllerReturnType,
  DefaultResponse,
  DropFirstParameter,
  ValidationMessage,
} from "../typings";
import { Validator } from "../App.validator";

export class CoreHelpers {
  static controller = (
    name: string,
    Middleware: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<ControllerReturnType> | ControllerReturnType
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
          between: (_) =>
            _.optional()
              .likeArray({ sanitize: true }, "Please provide a valid range!")
              .isLength(
                { min: 2, max: 2 },
                "A range should contain minimum or maximum two elements!"
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
        })
        .run();

      // Process Controller Operations
      const Results = await Middleware(req, res, next);

      // Check Results
      if (Results)
        // Call Controller Event & Return Response
        res.json(
          await CoreHelpers.controllerEvent(
            name,
            req,
            // Create Default Response
            await CoreHelpers.response(
              true,
              Results instanceof Array ? Results[0] : Results,
              Results instanceof Array ? Results[1] : undefined,
              Results instanceof Array ? Results[2] : undefined
            )
          )
        );
      else throw new Error(`No results from the current request!`);
    } catch (error) {
      try {
        // Call Controller Error Event & Pass Error
        next(await CoreHelpers.controllerEventError(name, req, error));
      } catch (error) {
        next(error);
      }
    }
  };

  static controllerEvent = async <R extends DefaultResponse<any, any>>(
    eventName: string,
    req: Request,
    res: R
  ) => {
    // Load Controller Events
    const ControllerEvents = require(`../controllers/${req.version}/events`)
      .default;

    // Call Controller Event Handler
    const ControllerEventHandler = ControllerEvents[eventName];

    // Validate Function
    if (typeof ControllerEventHandler?.event === "function")
      await ControllerEventHandler.event(req, res);

    // Return Default Response
    return res;
  };

  static controllerEventError = async <T>(
    eventName: string,
    req: Request,
    error: T
  ) => {
    // Load Controller Events
    const ControllerEvents = require(`../controllers/${req.version}/events`)
      .default;

    // Call Controller Event Handler
    const ControllerEventHandler = ControllerEvents[eventName];

    // Validate Function
    if (typeof ControllerEventHandler?.error === "function")
      await ControllerEventHandler.error(req, error);

    // Return Error
    return error;
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
