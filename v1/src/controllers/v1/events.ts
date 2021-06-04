import { ControllerEventsInterface } from "../../typings";

export default {
  "create.user": {
    event: (_, res) => console.log("A new User has been registered", res),
    error: (_, err) => console.log("User Registeration Failed!", err),
  },
} as ControllerEventsInterface;
