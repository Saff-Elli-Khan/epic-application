/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <PasswordImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </PasswordImport> */

/* /ImportsContainer */

@Schema()
export class Password extends Base {
  /* @ColumnsContainer */
  /* <PasswordIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  PasswordId!: number;
  /* </PasswordIdColumn> */

  /* <UserIdColumn[ColumnTemplate]> */
  @Column({})
  UserId!: string;
  /* </UserIdColumn> */

  /* <ValueColumn[ColumnTemplate]> */
  @Column({
    length: null,
  })
  Value!: string;
  /* </ValueColumn> */

  /* <StatusColumn[ColumnTemplate]> */
  @Column({
    choices: ["Valid", "Expired"],
    defaultValue: "Valid",
  })
  Status!: "Valid" | "Expired";
  /* </StatusColumn> */

  /* /ColumnsContainer */
}
