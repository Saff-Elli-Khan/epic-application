export declare enum LogTypes {
    LOG = "log",
    INFO = "info",
    DEBUG = "debug",
    WARN = "warn",
    ERROR = "error",
    TABLE = "table",
    TRACE = "trace"
}
export interface IDetectedLog {
    type: LogTypes;
    params: string[];
}
export declare const OverrideLogger: (type: LogTypes) => (...params: any[]) => void;
