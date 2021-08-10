/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <UploadImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </UploadImport> */

/* /ImportsContainer */

@Schema()
export class Upload extends Base {
  /* @ColumnsContainer */
  /* <UploadIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  UploadId!: number;
  /* </UploadIdColumn> */

  /* <UserIdColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  UserId!: string;
  /* </UserIdColumn> */

  /* <TypeColumn[ColumnTemplate]> */
  @Column({
    choices: ["Local", "Global"],
  })
  Type!: "Local" | "Global";
  /* </TypeColumn> */

  /* <ProviderColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Provider!: string;
  /* </ProviderColumn> */

  /* <MimeTypeColumn[ColumnTemplate]> */
  @Column({})
  MimeType!: string;
  /* </MimeTypeColumn> */

  /* <SizeColumn[ColumnTemplate]> */
  @Column({})
  Size!: number;
  /* </SizeColumn> */

  /* <DestinationColumn[ColumnTemplate]> */
  @Column({
    length: null,
  })
  Destination!: string;
  /* </DestinationColumn> */

  /* <FileNameColumn[ColumnTemplate]> */
  @Column({
    length: 255,
  })
  FileName!: string;
  /* </FileNameColumn> */

  /* <PathColumn[ColumnTemplate]> */
  @Column({
    length: null,
  })
  Path!: string;
  /* </PathColumn> */

  /* <AltColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Alt!: string;
  /* </AltColumn> */

  /* /ColumnsContainer */
}
