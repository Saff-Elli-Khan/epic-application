/**
 * IMPORTANT NOTE: Imports from core should always be done from the "./exports" module!
 * Direct import from core folder would break the plugins flow!
 */
export declare enum NODE_ENV {
    DEVELOPMENT = "development",
    PRODUCTION = "production",
    TEST = "test"
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
export declare const Configuration: any;
export declare const AppName: any;
export declare const RepositoryName: any;
export declare const IsPlugin: boolean;
export declare const Locals: Record<string, any>;
