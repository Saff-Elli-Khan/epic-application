import { Translation as TranslationManager } from "epic-translate";

// Internationalize your application with multi-locale Translator
export const Translation = new TranslationManager({
  locales: (process.env.TRANSLATE_LOCALES || "en")
    .split(",")
    .map((_) => _.trim()),
  defaultLocale: process.env.TRANSLATE_DEFAULT,
});
