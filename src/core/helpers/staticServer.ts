import Path from "path";
import Fs from "fs";
import Express, { Express as ExpressType } from "express";
import { ForEachEnabledPlugin } from "@App/common";

export const ServeStaticWebsite = (
  framework: ExpressType,
  options: {
    path: string;
    sourcePath: string;
    index?: string;
  }
) => {
  framework.use(
    options.path,
    Express.Router()
      .use(Express.static(options.sourcePath))
      .get("/*", (_, res) => {
        console.log(
          "Static Content Requested!",
          Path.join(options.sourcePath, options.index || "index.html")
        );
        res.sendFile(
          Path.join(options.sourcePath, options.index || "index.html")
        );
      })
  );
};

export const StaticServe = (
  framework: ExpressType,
  rootDir = process.cwd()
) => {
  const PublicDir = Path.join(rootDir, "./public/");
  Fs.readdirSync(PublicDir)
    .filter((_) => Fs.lstatSync(Path.join(PublicDir, _)).isDirectory())
    .forEach((folder) =>
      ServeStaticWebsite(framework, {
        path: `/${folder}/`,
        sourcePath: Path.join(PublicDir, folder, "./www"),
      })
    );
};

export const ServeStaticContent = async (framework: ExpressType) => {
  // Serve from Plugins
  ForEachEnabledPlugin((plugin) =>
    StaticServe(
      framework,
      Path.join(process.cwd(), `./node_modules/${plugin.name}/`)
    )
  );

  // Serve Local
  StaticServe(framework);
};
