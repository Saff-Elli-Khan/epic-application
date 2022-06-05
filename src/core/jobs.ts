import Path from "path";
import Fs from "fs";
import { Configuration } from "./globals";

// Create Jobs Executer
export const ExecuteJobs = async () => {
  for (const Job of [
    // Load Plugins
    ...Object.keys(Configuration.plugins).reduce<(new () => any)[]>(
      (items, pluginName) => [
        ...items,
        ...(!Configuration.plugins[pluginName].disabled
          ? Fs.readdirSync(
              Path.join(
                process.cwd(),
                `./node_modules/${pluginName}/build/jobs/`
              )
            )
              .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
              .map(
                (filename) =>
                  require(Path.join(
                    process.cwd(),
                    `./node_modules/${pluginName}/build/jobs/${filename}`
                  ))[filename.replace(/\.(ts|js)$/, "") + "Job"]
              )
          : []),
      ],
      []
    ),

    // Local Imports
    ...(!Configuration.disabled
      ? Fs.readdirSync(Path.join(process.cwd(), "./src/jobs/"))
          .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
          .map(
            (filename) =>
              require(Path.join(process.cwd(), `./src/jobs/${filename}`))[
                filename.replace(/\.(ts|js)$/, "") + "Job"
              ]
          )
      : []),
  ])
    await Job();
};
