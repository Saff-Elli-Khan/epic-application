import { Events } from "./events";

export enum LogTypes {
  LOG = "log",
  DEBUG = "debug",
  WARN = "warn",
  ERROR = "error",
}

// Catch Logs
const OverrideLogger = (type: LogTypes) => {
  const OriginalLogger = console[type];

  return (...params: any[]) => {
    // Emit Event
    Events.emit("log_detected", { type, params });

    // Log to Console
    OriginalLogger(...params);
  };
};

console.log = OverrideLogger(LogTypes.LOG);
console.warn = OverrideLogger(LogTypes.WARN);
console.error = OverrideLogger(LogTypes.ERROR);
console.debug = OverrideLogger(LogTypes.DEBUG);
