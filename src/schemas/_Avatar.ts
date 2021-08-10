/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <AvatarImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </AvatarImport> */

/* <UserImport[ImportsTemplate]> */
import { User } from "./User";
/* </UserImport> */

/* <UploadImport[ImportsTemplate]> */
import { Upload } from "./Upload";
/* </UploadImport> */

/* /ImportsContainer */

@Schema()
export class Avatar extends Base {
  /* @ColumnsContainer */
  /* <AvatarIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  AvatarId!: number;
  /* </AvatarIdColumn> */

  /* <UserIdColumn[ColumnTemplate]> */
  @Column({})
  UserId!: string;
  /* </UserIdColumn> */

  /* <UploadIdColumn[ColumnTemplate]> */
  @Column({})
  UploadId!: number;
  /* </UploadIdColumn> */

  /* <UserColumn[OneRelationTemplate]> */
  @OneRelation<User, Avatar>({
    schema: () => User,
    mapping: ["UserId", "UserId"],
  })
  User!: User;
  /* </UserColumn> */

  /* <UploadColumn[OneRelationTemplate]> */
  @OneRelation<Upload, Avatar>({
    schema: () => Upload,
    mapping: ["UploadId", "UploadId"],
  })
  Upload!: Upload;
  /* </UploadColumn> */

  /* /ColumnsContainer */
}
