"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translation = void 0;
const epic_translate_1 = require("epic-translate");
// Internationalize your application with multi-locale Translator
exports.Translation = new epic_translate_1.Translation({
    locales: (process.env.TRANSLATE_LOCALES || "en")
        .split(",")
        .map((_) => _.trim()),
    sourceLocale: process.env.TRANSLATE_SOURCE,
    defaultLocale: process.env.TRANSLATE_DEFAULT,
});
