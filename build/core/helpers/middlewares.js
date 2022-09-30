"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleRequestClose = exports.InjectRequestUtils = void 0;
const epic_odm_1 = require("@oridune/epic-odm");
const database_1 = require("../database");
const tokens_1 = require("../tokens");
const translation_1 = require("../translation");
const geo_1 = require("../geo");
const events_1 = require("../events");
const redis_1 = require("../redis");
// Global Utilities Injector Middleware
const InjectRequestUtils = () => async (req, _res, next) => {
    try {
        // Create Database Session
        req.database = await new epic_odm_1.DatabaseSession(database_1.DatabaseAdapter).start();
        // Add Utilities
        req.redis = redis_1.RedisClient;
        req.geo = geo_1.GeoData;
        req.tokens = tokens_1.TokensManager;
        req.translator = translation_1.Translation.session();
        // Misc
        req.debugInfo = {};
        // Continue to Next Middleware
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.InjectRequestUtils = InjectRequestUtils;
const HandleRequestClose = () => async (req, res, next) => {
    // On Request End
    res.on("close", async () => {
        var _a, _b, _c;
        // Final Tasks
        await ((_b = (_a = req.response) === null || _a === void 0 ? void 0 : _a.AfterResponse) === null || _b === void 0 ? void 0 : _b.call(_a));
        // Emit Event
        if (req.name)
            events_1.Events.emit(req.name, req);
        // Close Database Session
        (_c = req.database) === null || _c === void 0 ? void 0 : _c.end();
    });
    // Continue to Next Middleware
    next();
};
exports.HandleRequestClose = HandleRequestClose;
