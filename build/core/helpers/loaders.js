"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadChildControllers = exports.LoadModules = exports.LoadLocalModules = exports.LoadModulesFromPlugins = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const common_1 = require("@App/common");
const epic_odm_1 = require("@oridune/epic-odm");
const LoadModulesFromPlugins = (type) => Object.keys(common_1.Configuration.plugins).reduce((items, pluginName) => [
    ...items,
    ...(0, exports.LoadLocalModules)(type, {
        disabled: common_1.Configuration.plugins[pluginName].disabled,
        moduleDir: path_1.default.join(process.cwd(), `./node_modules/${pluginName}/build/${epic_odm_1.Utils.pluralize(type)}/`),
    }),
], []);
exports.LoadModulesFromPlugins = LoadModulesFromPlugins;
const LoadLocalModules = (type, options) => {
    var _a;
    // Get Module Directory
    const ModuleDir = (options === null || options === void 0 ? void 0 : options.moduleDir) ||
        path_1.default.join(process.cwd(), `./${process.env.NODE_ENV === common_1.NODE_ENV.PRODUCTION ? "build" : "src"}/${epic_odm_1.Utils.pluralize(type)}/`);
    if (fs_1.default.existsSync(ModuleDir)) {
        // Get Lock Information
        const LockFilePath = path_1.default.join(ModuleDir, "../../epic.lock.json");
        const LockInfo = fs_1.default.existsSync(LockFilePath) ? require(LockFilePath) : {};
        const ModulesList = (LockInfo.modules || []).filter((module) => module.type === type);
        // Load Modules
        return !((_a = options === null || options === void 0 ? void 0 : options.disabled) !== null && _a !== void 0 ? _a : common_1.Configuration.disabled)
            ? fs_1.default.readdirSync(ModuleDir)
                .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
                .sort((a, b) => ModulesList.indexOf(ModulesList.filter((item) => item.name === a.replace(/\.(ts|js)$/, ""))[0]) -
                ModulesList.indexOf(ModulesList.filter((item) => item.name === b.replace(/\.(ts|js)$/, ""))[0]))
                .map((filename) => Promise.resolve().then(() => __importStar(require(path_1.default.join(ModuleDir, filename)))).then((module) => module[filename.replace(/\.(ts|js)$/, "") +
                (() => {
                    switch (type) {
                        case "controller":
                            return "Controller";
                        case "middleware":
                            return "Middleware";
                        case "job":
                            return "Job";
                        case "model":
                            return "Model";
                        default:
                            return "";
                    }
                })()]))
            : [];
    }
    else
        return [];
};
exports.LoadLocalModules = LoadLocalModules;
const LoadModules = (type) => [
    // Load Plugins
    ...(0, exports.LoadModulesFromPlugins)(type),
    // Local Imports
    ...(0, exports.LoadLocalModules)(type),
];
exports.LoadModules = LoadModules;
const LoadChildControllers = (path, parentName) => fs_1.default.readdirSync(path)
    .filter((filename) => new RegExp(`^${parentName}.[A-Z]\\w+.(ts|js)$`.replace(".", "\\.")).test(filename))
    .map((filename) => Promise.resolve().then(() => __importStar(require(path_1.default.join(path, filename)))).then((module) => module[filename.replace(/\.(ts|js)$/, "").replace(".", "") + "Controller"]));
exports.LoadChildControllers = LoadChildControllers;
