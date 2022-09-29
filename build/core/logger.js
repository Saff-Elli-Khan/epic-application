"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogTypes = void 0;
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
console.log = OverrideLogger(LogTypes.LOG);
console.info = OverrideLogger(LogTypes.INFO);
console.warn = OverrideLogger(LogTypes.WARN);
console.error = OverrideLogger(LogTypes.ERROR);
console.debug = OverrideLogger(LogTypes.DEBUG);
console.table = OverrideLogger(LogTypes.TABLE);
console.trace = OverrideLogger(LogTypes.TRACE);
