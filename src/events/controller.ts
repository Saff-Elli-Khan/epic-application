import { DefaultResponse } from "../helpers/core";

export const ControllerEvents = {
  "create.user": (res: DefaultResponse<true, any>) =>
    console.log("A new User has been registered", res),

  // Handle All Error Events
  error: (res: DefaultResponse<false, any>) =>
    console.log("An Error Occured!", res),
};
