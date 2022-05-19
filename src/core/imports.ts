/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ControllerTemplate> {{ child }}, </ControllerTemplate> */
/* <MiddlewareTemplate> {{ middleware }}, </MiddlewareTemplate> */
/* <JobTemplate> await {{ job }}(); </JobTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

// Import Controllers
export const ImportControllers = () => [
  /* @ControllersContainer */
  /* /ControllersContainer */
];

// Import Middlewares
export const ImportMiddlewares = () => [
  /* @MiddlewaresContainer */
  /* /MiddlewaresContainer */
];

// Import Jobs
export const ImportJobs = async () => {
  /* @JobsContainer */
  /* /JobsContainer */
};
