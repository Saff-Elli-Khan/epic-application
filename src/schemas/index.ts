/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <SchemaTemplate> {{ schema }}, </SchemaTemplate> */

/* @ImportsContainer */
/* <SettingsImport[ImportsTemplate]> */
import { Settings } from "./Settings";
/* </SettingsImport> */

/* /ImportsContainer */

export const SchemaList = [
  /* @SchemasContainer */
/* <SettingsSchema[SchemaTemplate]> */
Settings,
/* </SettingsSchema> */

/* /SchemasContainer */
];