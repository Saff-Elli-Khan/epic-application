/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <SubscriptionImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </SubscriptionImport> */

/* <UserImport[ImportsTemplate]> */
import { User } from "./User";
/* </UserImport> */

/* /ImportsContainer */

@Schema()
export class Subscription extends Base {
  /* @ColumnsContainer */
  /* <SubscriptionIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  SubscriptionId!: number;
  /* </SubscriptionIdColumn> */

  /* <UserIdColumn[ColumnTemplate]> */
  @Column({})
  UserId!: string;
  /* </UserIdColumn> */

  /* <TypeColumn[ColumnTemplate]> */
  @Column({
    choices: ["Email", "Contact"],
  })
  Type!: "Email" | "Contact";
  /* </TypeColumn> */

  /* <ValueColumn[ColumnTemplate]> */
  @Column({})
  Value!: string;
  /* </ValueColumn> */

  /* <IsVerifiedColumn[ColumnTemplate]> */
  @Column({
    defaultValue: false,
  })
  IsVerified!: boolean;
  /* </IsVerifiedColumn> */

  /* <AllowNewsLettersColumn[ColumnTemplate]> */
  @Column({
    defaultValue: false,
  })
  AllowNewsLetters!: boolean;
  /* </AllowNewsLettersColumn> */

  /* <UserColumn[OneRelationTemplate]> */
  @OneRelation<User, Subscription>({
    schema: () => User,
    mapping: ["UserId", "UserId"],
  })
  User!: User;
  /* </UserColumn> */

  /* /ColumnsContainer */
}
