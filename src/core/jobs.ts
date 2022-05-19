import Path from "path";
import Fs from "fs";

// Create Jobs Executer
export const ExecuteJobs = async () => {
  for (const Job of Fs.readdirSync(Path.join(process.cwd(), "./src/jobs/"))
    .filter((filename) => /^[A-Z]\w+\.(ts|js)$/.test(filename))
    .map(
      (filename) =>
        require(Path.join(process.cwd(), `./src/jobs/${filename}`))[
          filename.replace(/\.(ts|js)$/, "") + "Job"
        ]
    ))
    await Job();
};
