/**
 * IMPORTANT NOTE: Imports from core should always be done from the "./exports" module!
 * Direct import from core folder would break the plugins flow!
 */
export declare enum NODE_ENV {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test"
}
export interface IPluginDetails {
    name: string;
    locals: Record<string, any>;
    dependencyOf: string[];
    development: boolean;
    disabled: boolean;
}
export declare const DefaultCorsConfiguration: {
    origin: string[] | undefined;
    allowedHeaders: string[] | undefined;
    credentials: boolean;
    exposedHeaders: string[] | undefined;
    methods: string[] | undefined;
    preflightContinue: boolean;
};
export declare const InjectEnv: <T extends Record<string, any>>(object: T) => T;
/** Get Current Configuration */
export declare const Configuration: any;
/** Current App Name */
export declare const AppName: any;
/** Current Repository Name */
export declare const RepositoryName: any;
/** Type of the application */
export declare const IsPlugin: boolean;
/** Application's local settings */
export declare const Locals: Record<string, any>;
/** Loop over the application plugins */
export declare const ForEachEnabledPlugin: <T extends unknown>(callback: (pluginDetails: IPluginDetails) => T) => T[];
