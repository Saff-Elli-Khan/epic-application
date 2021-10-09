/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <SchemaListTemplate> {{ schema }}, </SchemaListTemplate> */

import { Connection, EpicSQLManager } from "@saffellikhan/epic-sql";
import { ConfigManager } from "@saffellikhan/epic-cli";
/* @ImportsContainer */
/* /ImportsContainer */

// Schema List
export const SchemaList = [
  /* @SchemaListContainer */
  /* /SchemaListContainer */
];

// Create A New Database Connection.
export const createDatabaseConnection = (sync = false, logs = false) =>
  new EpicSQLManager(
    new Connection(
      (() => {
        // Get Connection Details
        const ConnectionDetails = ConfigManager.getConfig("main").database;

        return {
          host: ConnectionDetails.host,
          port: ConnectionDetails.port,
          user: ConnectionDetails.user,
          password: ConnectionDetails.password,
          database: ConnectionDetails.dbname,
        };
      })()
    ),
    SchemaList
  ).init({
    sync,
    logs,
  });
