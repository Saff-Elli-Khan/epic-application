/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <RoleImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </RoleImport> */

/* /ImportsContainer */

@Schema()
export class Role extends Base {
  /* @ColumnsContainer */
  /* <RoleIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  RoleId!: number;
  /* </RoleIdColumn> */

  /* <TitleColumn[ColumnTemplate]> */
  @Column({
    index: ["UNIQUE"],
  })
  Title!: string;
  /* </TitleColumn> */

  /* <PermissionsColumn[ColumnTemplate]> */
  @Column({
    defaultValue: () => [],
  })
  Permissions!: Array<string>;
  /* </PermissionsColumn> */

  /* /ColumnsContainer */
}
