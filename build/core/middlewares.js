"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewares = void 0;
const express_1 = __importDefault(require("express"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_useragent_1 = __importDefault(require("express-useragent"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_status_1 = require("http-status");
const common_1 = require("../common");
const middlewares_1 = require("./helpers/middlewares");
const loaders_1 = require("./helpers/loaders");
const Middlewares = async (Framework) => Framework
    // Utility Middlewares
    .use([
    (0, morgan_1.default)("dev"),
    (0, helmet_1.default)(),
    (0, hpp_1.default)(),
    (0, cors_1.default)(common_1.DefaultCorsConfiguration),
    (0, cookie_parser_1.default)(),
    (0, compression_1.default)(),
    express_useragent_1.default.express(),
    express_1.default.json({
        verify: (req, _, buffer) => {
            // @ts-ignore
            req.rawBody = buffer;
        },
    }),
    express_1.default.urlencoded({ extended: true }),
    (0, express_rate_limit_1.default)({
        handler: (_, res, next) => {
            res.status(http_status_1.TOO_MANY_REQUESTS);
            next(new Error(`Too many requests, please try again later.`));
        },
        windowMs: parseInt(process.env.RATE_LIMITER_WAITING_TIME || "90000"),
        max: parseInt(process.env.RATE_LIMITER_MAX || "100"),
    }),
    (0, middlewares_1.InjectRequestUtils)(),
    (0, middlewares_1.HandleRequestClose)(),
    // Load Modules
    ...(await Promise.all((0, loaders_1.LoadModules)("middleware"))),
]);
exports.Middlewares = Middlewares;
