"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OverrideLogger = exports.LogTypes = void 0;
const events_1 = require("./events");
var LogTypes;
(function (LogTypes) {
    LogTypes["LOG"] = "log";
    LogTypes["INFO"] = "info";
    LogTypes["DEBUG"] = "debug";
    LogTypes["WARN"] = "warn";
    LogTypes["ERROR"] = "error";
    LogTypes["TABLE"] = "table";
    LogTypes["TRACE"] = "trace";
})(LogTypes = exports.LogTypes || (exports.LogTypes = {}));
// Catch Logs
const OverrideLogger = (type) => {
    const OriginalLogger = console[type];
    return (...params) => {
        // Emit Event
        events_1.Events.emit("log_detected", { type, params });
        // Log to Console
        OriginalLogger(...params);
    };
};
exports.OverrideLogger = OverrideLogger;
console.log = (0, exports.OverrideLogger)(LogTypes.LOG);
console.info = (0, exports.OverrideLogger)(LogTypes.INFO);
console.warn = (0, exports.OverrideLogger)(LogTypes.WARN);
console.error = (0, exports.OverrideLogger)(LogTypes.ERROR);
console.debug = (0, exports.OverrideLogger)(LogTypes.DEBUG);
console.table = (0, exports.OverrideLogger)(LogTypes.TABLE);
console.trace = (0, exports.OverrideLogger)(LogTypes.TRACE);
