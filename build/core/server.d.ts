import "./controllers";
import {
  HTTP,
  EpicApplication,
  Request,
  Response,
  CreateResponse,
} from "@saffellikhan/epic-express";
export declare class Application extends EpicApplication {
  _beforeInit: () => Promise<void>;
  _onRouteError: (err: any, req: Request, res: Response) => CreateResponse;
}
export declare const HTTPServer: HTTP;
