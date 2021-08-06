/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "@AppPath/schemas/Base";
/* @ImportsContainer */

/* <SampleImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </SampleImport> */

/* /ImportsContainer */

@Schema()
export class Sample extends Base {
  /* @ColumnsContainer */

  /* <SampleIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  SampleId!: number;
  /* </SampleIdColumn> */

  /* /ColumnsContainer */
}
