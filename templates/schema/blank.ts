/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import {
  Schema,
  BaseSchema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* @ImportsContainer */
/* /ImportsContainer */

@Schema()
export class Sample extends BaseSchema {
  /* @ColumnsContainer */
  /* /ColumnsContainer */
}
