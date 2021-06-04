import Path from "path";
import {
  CurrencyInterface,
  LanguageInterface,
  PackageInterface,
  SecurityInterface,
  UploadsConfigurationInterface,
} from "./typings/core";
import { ConfigManagerUtils } from "epic-config-manager";
import { EpicTokens } from "epic-tokens";
import { EpicGeo } from "epic-geo";
import { PermissionsManager as PM } from "epic-permissions-manager";
import { GatewayManager as PaymentGatewayManager } from "epic-pay";

// Geo Data Instance
export const Geo = new EpicGeo();

// Global Tokens Manager
export const TokensManager = new EpicTokens(
  () => Configuration().SECURITY.encryption.key
);

// Global Permissions Manager
export const PermissionsManager = new PM(
  [
    // Core Permissions
    "Auth",
    "Permissions",
    "Self",
    "Users",
    "Notifications",
    "Public Notifications",
    "Profiles",
    "Public Profiles",
  ],
  ["Create", "Get", "Search", "Count", "Stats", "Update", "Delete"]
);

// Global Payment Gateway Manager
export const GatewayManager = new PaymentGatewayManager({
  // Gateway Configuration
});

// Load Configuration Files
export const ConfigurationFile = <T>(fileName: string): T =>
  require(Path.join(process.cwd(), `./src/configuration/${fileName}.json`));

// Configuration Class
export const Configuration = new (class {
  // Global Configuration
  public global = () => ({
    // If Enabled, Application will give Error Stacks for Errors on the requests
    DEBUGING: process.env.NODE_ENV === "development",

    // Package Information
    PACKAGE: ConfigurationFile<PackageInterface>("../../package"),

    // Application Configuration
    APP: {
      publicDir: "./public/",
      uploads: ConfigurationFile<UploadsConfigurationInterface>("uploads"),
    },
  });

  // Development Configuration
  public development = () => ({
    // Users Configuration
    USERS: {
      default: "root",
      subscription: {
        type: "Email" as "Email" | "Contact",
      },
      tokens: {
        authorization: {
          expiry: 86400, // 1 Day
        },
      },
      permissions: {
        // Permissions used if no Authorization Token provided.
        unauthenticated: PermissionsManager.createPermissions({
          // Core Permissions
          Auth: ["Create"],
          Users: ["Create", "Get"],
        }),

        // Permissions used if Authorization Token has been provided.
        authenticated: PermissionsManager.createPermissions({
          // Core Permissions
          Auth: ["Update", "Delete"],
          Users: ["Create", "Get"],
          Notifications: ["Search", "Get"],
          Profiles: ["Get", "Update"],
        }),
      },
    },

    // Database Connection
    DATABASE: {
      connection: {
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "test",
      },
      options: {
        sync: false,
        logs: true,
      },
    },

    // Request & Data Security
    SECURITY: {
      encryption: {
        key: "8vkPiniMBXbplMvD2TanI8pytfEEaDtN",
      },
      ip: {
        enabled: true,
        allowedIps: ["127.0.0.1", "::1"],
        filterMode: "allow",
        logLevel: "all",
        excludeRoutes: [],
      } as SecurityInterface["ip"],
    },

    // Load Available Languages
    LANGUAGES: ConfigurationFile<LanguageInterface[]>("languages"),

    // Load Available Currencies
    CURRENCIES: ConfigurationFile<CurrencyInterface[]>("currencies"),
  });

  // Production Configuration
  public production = () =>
    ConfigManagerUtils.deepMerge(this.development(), {
      // Development Configuration Overrides

      // Database Connection
      DATABASE: {
        connection: {
          host: "localhost",
          port: 3306,
          user: "root",
          password: "",
          database: "test",
        },
        options: {
          sync: false,
          logs: false,
        },
      },
    });

  public export = () => ({
    ...this.global(),
    ...this[(process.env.NODE_ENV || "production") as "production"](),
  });
})().export;
