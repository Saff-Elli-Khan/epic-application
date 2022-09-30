"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeStaticContent = exports.StaticServe = exports.ServeStaticWebsite = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const common_1 = require("../../common");
const ServeStaticWebsite = (framework, options) => {
    framework.use(options.path, express_1.default.Router()
        .use(express_1.default.static(options.sourcePath))
        .get("/*", (_, res) => {
        console.log("Static Content Requested!", path_1.default.join(options.sourcePath, options.index || "index.html"));
        res.sendFile(path_1.default.join(options.sourcePath, options.index || "index.html"));
    }));
};
exports.ServeStaticWebsite = ServeStaticWebsite;
const StaticServe = (framework, rootDir = process.cwd()) => {
    const PublicDir = path_1.default.join(rootDir, "./public/");
    fs_1.default.readdirSync(PublicDir)
        .filter((_) => fs_1.default.lstatSync(path_1.default.join(PublicDir, _)).isDirectory())
        .forEach((folder) => (0, exports.ServeStaticWebsite)(framework, {
        path: `/${folder}/`,
        sourcePath: path_1.default.join(PublicDir, folder, "./www"),
    }));
};
exports.StaticServe = StaticServe;
const ServeStaticContent = async (framework) => {
    // Serve from Plugins
    (0, common_1.ForEachEnabledPlugin)((plugin) => (0, exports.StaticServe)(framework, path_1.default.join(process.cwd(), `./node_modules/${plugin.name}/`)));
    // Serve Local
    (0, exports.StaticServe)(framework);
};
exports.ServeStaticContent = ServeStaticContent;
