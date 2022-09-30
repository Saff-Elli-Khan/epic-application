import { Events } from "./events";

export enum LogTypes {
  LOG = "log",
  INFO = "info",
  DEBUG = "debug",
  WARN = "warn",
  ERROR = "error",
  TABLE = "table",
  TRACE = "trace",
}

export interface IDetectedLog {
  type: LogTypes;
  params: string[];
}

export const OverrideLogger = (type: LogTypes) => {
  const OriginalLogger = console[type];

  return (...params: any[]) => {
    // Emit Event
    Events.emit("log_detected", { type, params });

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
