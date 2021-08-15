/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "../schemas/base";
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* @ImportsContainer */
/* /ImportsContainer */

@Schema()
export class Settings extends Base {
  /* @ColumnsContainer */
/* <SettingsIdColumn[ColumnTemplate]> */
@Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  SettingsId!: number;
/* </SettingsIdColumn> */

/* <KeyColumn[ColumnTemplate]> */
@Column({
index: ["UNIQUE"],
}) Key!: string;
/* </KeyColumn> */

/* <ValueColumn[ColumnTemplate]> */
@Column({
nullable: true,
}) Value!: any;
/* </ValueColumn> */

/* /ColumnsContainer */
}