import { DefaultResponse } from "../helpers/core";

export const ControllerEvents = {
  "create.user": (_: Request, res: DefaultResponse<true, any>) =>
    console.log("A new User has been registered", res),

  "create.user.error": (_: Request, error: any) =>
    console.log("User Registeration Failed!", error),

  // Handle All Error Events
  error: (_: Request, res: DefaultResponse<false, any>) =>
    console.log("An Error Occured!", res),
};
