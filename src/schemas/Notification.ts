/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "../schemas/Base";
/* @ImportsContainer */
/* <NotificationImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </NotificationImport> */

/* <UserImport[ImportsTemplate]> */
import { User } from "./User";
/* </UserImport> */

/* /ImportsContainer */

@Schema()
export class Notification extends Base {
  /* @ColumnsContainer */
/* <NotificationIdColumn[ColumnTemplate]> */
@Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  NotificationId!: number;
/* </NotificationIdColumn> */

/* <UserIdColumn[ColumnTemplate]> */
@Column({
}) UserId!: string;
/* </UserIdColumn> */

/* <TypeColumn[ColumnTemplate]> */
@Column({
choices: ["Success", "Info", "Warning", "Danger"],
defaultValue: "Info",
}) Type!: "Success" | "Info" | "Warning" | "Danger";
/* </TypeColumn> */

/* <SubjectColumn[ColumnTemplate]> */
@Column({
defaultValue: () => ({en: "N/A"}),
}) Subject!: Record<string, any>;
/* </SubjectColumn> */

/* <MessageColumn[ColumnTemplate]> */
@Column({
defaultValue: () => ({ en: "N/A" }),
}) Message!: Record<string, string>;
/* </MessageColumn> */

/* <SeenColumn[ColumnTemplate]> */
@Column({
defaultValue: false,
}) Seen!: boolean;
/* </SeenColumn> */

/* <ImportantColumn[ColumnTemplate]> */
@Column({
defaultValue: false,
}) Important!: boolean;
/* </ImportantColumn> */

/* <MetadataColumn[ColumnTemplate]> */
@Column({
defaultValue: () => ({}),
}) Metadata!: Record<string, any>;
/* </MetadataColumn> */

/* <UserColumn[OneRelationTemplate]> */
@OneRelation<User, Notification>({ schema: () => User, mapping: ["UserId","UserId"] }) User!: User;
/* </UserColumn> */

/* /ColumnsContainer */
}