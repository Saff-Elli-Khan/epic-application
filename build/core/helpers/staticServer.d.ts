import { Express as ExpressType } from "express";
export declare const ServeStaticWebsite: (framework: ExpressType, options: {
    path: string;
    sourcePath: string;
    index?: string;
}) => void;
export declare const StaticServe: (framework: ExpressType, rootDir?: string) => void;
export declare const ServeStaticContent: (framework: ExpressType) => Promise<void>;
