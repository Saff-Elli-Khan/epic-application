"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPServer = exports.Application = void 0;
require("./controllers");
const common_1 = require("../common");
const epic_express_1 = require("@saffellikhan/epic-express");
const validator_1 = require("@oridune/validator");
const middlewares_1 = require("./middlewares");
const events_1 = require("./events");
const jobs_1 = require("./jobs");
const database_1 = require("./database");
const http_status_1 = require("http-status");
// Prepare Application
class Application extends epic_express_1.EpicApplication {
    constructor() {
        super(...arguments);
        this._beforeInit = async () => {
            // Sync Database in Development
            if (process.env.NODE_ENV === common_1.NODE_ENV.DEVELOPMENT)
                await database_1.DatabaseAdapter.sync();
            // Install Middlewares
            await (0, middlewares_1.Middlewares)(this.Framework);
            // Start Executing Jobs
            await (0, jobs_1.ExecuteJobs)();
        };
        this._onRouteError = (err, req, res) => {
            // If the status code was not changed than predict it
            if (res.statusCode === http_status_1.OK)
                if (err instanceof validator_1.ValidationException)
                    // Request Validation Error
                    res.status(http_status_1.BAD_REQUEST);
                // Not Found
                else if ((err === null || err === void 0 ? void 0 : err.message) === "Not Found")
                    res.status(http_status_1.NOT_FOUND);
                // Internal Server Error
                else
                    res.status(http_status_1.INTERNAL_SERVER_ERROR);
            // Emit Internal Server Error Event
            if (res.statusCode >= http_status_1.INTERNAL_SERVER_ERROR) {
                events_1.Events.emit("internal_server_error", {
                    errorId: req.id,
                    message: err.message || err,
                    stack: err.stack || err,
                });
                return new epic_express_1.CreateResponse(process.env.NODE_ENV !== common_1.NODE_ENV.PRODUCTION
                    ? err.message || err
                    : req.translator.tr(`Internal server error! Please contact support with the following Error ID: <>.`, { params: [req.id] }), process.env.NODE_ENV !== common_1.NODE_ENV.PRODUCTION
                    ? { stack: err.stack || err }
                    : {}).isFalse();
            }
            // Return Response Object
            return new epic_express_1.CreateResponse(err instanceof epic_express_1.RouteAccessDenied
                ? req.translator.tr(`You are not permitted! Missing permission '<>'.`, {
                    params: [err.Permission],
                })
                : (err === null || err === void 0 ? void 0 : err.issues) || (err === null || err === void 0 ? void 0 : err.message) || err || "Unknown error occured!").isFalse();
        };
    }
}
exports.Application = Application;
// Create HTTP Server
exports.HTTPServer = new epic_express_1.HTTP(new Application());
