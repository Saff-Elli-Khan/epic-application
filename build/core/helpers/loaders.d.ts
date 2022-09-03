export declare type ModuleTypes = "controller" | "model" | "middleware" | "job";
export declare const LoadModulesFromPlugins: (type: ModuleTypes) => Promise<new () => any>[];
export declare const LoadLocalModules: (type: ModuleTypes, options?: {
    disabled?: boolean;
    moduleDir?: string;
}) => Promise<any>[];
export declare const LoadModules: (type: ModuleTypes) => Promise<any>[];
export declare const LoadChildControllers: (path: string, parentName: string) => Promise<any>[];
