"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.APIController = void 0;
const epic_express_1 = require("@saffellikhan/epic-express");
const loaders_1 = require("./helpers/loaders");
let APIController = class APIController {
    async APIHome(_, res) {
        // Get API Details
        delete res.locals.useragent;
        // Return API Details
        return new epic_express_1.CreateResponse(`The API is online listening to the requests!`, res.locals);
    }
};
__decorate([
    (0, epic_express_1.Get)("/", {
        authType: "none",
        description: "Get the API details and metadata.",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], APIController.prototype, "APIHome", null);
APIController = __decorate([
    (0, epic_express_1.Controller)("/api/", {
        childs: (0, loaders_1.LoadModules)("controller"),
    })
], APIController);
exports.APIController = APIController;
let AppController = class AppController {
    async AppHome(_) {
        // Return API Details
        return new epic_express_1.CreateResponse(`No resources exists here, Please navigate to the desired endpoint!`);
    }
};
__decorate([
    (0, epic_express_1.Get)("/", {
        authType: "none",
        description: "Hello world from the app home.",
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "AppHome", null);
AppController = __decorate([
    (0, epic_express_1.RootController)("/", {
        childs: [APIController],
    })
], AppController);
exports.AppController = AppController;
