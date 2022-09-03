"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = void 0;
const events_1 = __importDefault(require("events"));
// Create Event Emitter Instance
exports.Events = new events_1.default();
