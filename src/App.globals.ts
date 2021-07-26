import Path from "path";
import { EpicTokens } from "epic-tokens";
import { ConnectionConfiguration } from "epic-sql";
import {
  CurrencyInterface,
  LanguageInterface,
  PackageInterface,
  UsersConfigInterface,
  SecurityConfigInterface,
  UploadsConfigInterface,
} from "./types";
import {
  ConfigManager as EpicConfigManager,
  ConfigManagerUtils,
} from "epic-config-manager";

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => process.env.ENCRYPTION_KEY || "nb4ZHjgVgu0BtM83K97ZNyw8934xUp2Z"
);

export const ConfigManager = new EpicConfigManager(
  new (class {
    // Global Configuration
    public global = () => ({
      // If Enabled, Application will give Error Stacks for Errors on the requests
      DEBUGING: process.env.NODE_ENV === "development",

      // Application Package Information
      PACKAGE: require(Path.join(
        process.cwd(),
        "./package.json"
      )) as PackageInterface,

      // Uploads Configuration
      UPLOADS: require(Path.join(
        process.cwd(),
        "./package.json"
      )) as UploadsConfigInterface,

      // Supported Lanuages
      LANGUAGES: require(Path.join(
        process.cwd(),
        "./src/configuration/languages.json"
      )) as LanguageInterface[],

      // Supported Currencies
      CURRENCIES: require(Path.join(
        process.cwd(),
        "./src/configuration/currencies.json"
      )) as CurrencyInterface[],
    });

    // Development Configuration
    public development = () => ({
      // Request & Data Security
      SECURITY: require(Path.join(
        process.cwd(),
        "./src/configuration/security.json"
      )) as SecurityConfigInterface,

      // Users Configuration
      USERS: require(Path.join(
        process.cwd(),
        "./src/configuration/users.json"
      )) as UsersConfigInterface,

      // Database Connection
      DATABASE: require(Path.join(
        process.cwd(),
        "./src/configuration/database.json"
      )) as ConnectionConfiguration<"mysql">,
    });

    // Production Configuration
    public production = () =>
      ConfigManagerUtils.deepMerge(this.development(), {
        // Development Configuration Overrides
      });

    public export = () => ({
      ...this.global(),
      ...this[(process.env.NODE_ENV || "production") as "production"](),
    });
  })().export
);

export const Configuration = () => ConfigManager.render();
