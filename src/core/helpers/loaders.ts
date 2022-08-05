import Fs from "fs";
import Path from "path";
import { Configuration, NODE_ENV } from "@App/common";
import { Utils } from "@oridune/epic-odm";

export type ModuleTypes = "controller" | "model" | "middleware" | "job";

export const LoadModulesFromPlugins = (type: ModuleTypes) =>
  Object.keys(Configuration.plugins).reduce<Promise<new () => any>[]>(
    (items, pluginName) => [
      ...items,
      ...LoadLocalModules(type, {
        disabled: Configuration.plugins[pluginName].disabled,
        moduleDir: Path.join(
          process.cwd(),
          `./node_modules/${pluginName}/build/${Utils.pluralize(type)}/`
        ),
      }),
    ],
    []
  );

export const LoadLocalModules = (
  type: ModuleTypes,
  options?: {
    disabled?: boolean;
    moduleDir?: string;
  }
) => {
  // Get Module Directory
  const ModuleDir =
    options?.moduleDir ||
    Path.join(
      process.cwd(),
      `./${
        process.env.NODE_ENV === NODE_ENV.PRODUCTION ? "build" : "src"
      }/${Utils.pluralize(type)}/`
    );

  if (Fs.existsSync(ModuleDir)) {
    // Get Lock Information
    const LockFilePath = Path.join(ModuleDir, "../../epic.lock.json");
    const LockInfo = Fs.existsSync(LockFilePath) ? require(LockFilePath) : {};
    const ModulesList = (
      (LockInfo.modules || []) as Array<{
        type: string;
        name: string;
      }>
    ).filter((module) => module.type === type);

    // Load Modules
    return !(options?.disabled ?? Configuration.disabled)
      ? Fs.readdirSync(ModuleDir)
          .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
          .sort(
            (a, b) =>
              ModulesList.indexOf(
                ModulesList.filter(
                  (item) => item.name === a.replace(/\.(ts|js)$/, "")
                )[0]
              ) -
              ModulesList.indexOf(
                ModulesList.filter(
                  (item) => item.name === b.replace(/\.(ts|js)$/, "")
                )[0]
              )
          )
          .map((filename) =>
            import(Path.join(ModuleDir, filename)).then(
              (module) =>
                module[
                  filename.replace(/\.(ts|js)$/, "") +
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
                    })()
                ]
            )
          )
      : [];
  } else return [];
};

export const LoadModules = (type: ModuleTypes) => [
  // Load Plugins
  ...LoadModulesFromPlugins(type),

  // Local Imports
  ...LoadLocalModules(type),
];

export const LoadChildControllers = (path: string, parentName: string) =>
  Fs.readdirSync(path)
    .filter((filename) =>
      new RegExp(`^${parentName}.[A-Z]\\w+.(ts|js)$`.replace(".", "\\.")).test(
        filename
      )
    )
    .map((filename) =>
      import(Path.join(path, filename)).then(
        (module) =>
          module[
            filename.replace(/\.(ts|js)$/, "").replace(".", "") + "Controller"
          ]
      )
    );
