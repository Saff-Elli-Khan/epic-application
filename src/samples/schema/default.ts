/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: any; </ColumnTemplate> */

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
