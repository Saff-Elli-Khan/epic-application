/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <MiddlewareTemplate> {{ middleware }}, </MiddlewareTemplate> */

import { Express, Request, Response, NextFunction } from "express";
/* @ImportsContainer */
/* /ImportsContainer */

export const CustomMiddlewares = (Framework: Express) =>
  Framework.use([
    /* @MiddlewaresContainer */
/* /MiddlewaresContainer */

    // Dummy Middleware Function
    (_: Request, __: Response, next: NextFunction) => {
      // Continue to Next Middleware
      next();
    },
  ]);