/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <UserImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </UserImport> */

/* <PasswordImport[ImportsTemplate]> */
import { Password } from "./Password";
/* </PasswordImport> */

/* <ProfileImport[ImportsTemplate]> */
import { Profile } from "./Profile";
/* </ProfileImport> */

/* <SubscriptionImport[ImportsTemplate]> */
import { Subscription } from "./Subscription";
/* </SubscriptionImport> */

/* <UploadImport[ImportsTemplate]> */
import { Upload } from "./Upload";
/* </UploadImport> */

/* /ImportsContainer */

@Schema()
export class User extends Base {
  /* @ColumnsContainer */
  /* <UserIdColumn[ColumnTemplate]> */
  @Column({
    index: ["UNIQUE"],
  })
  UserId!: string;
  /* </UserIdColumn> */

  /* <FnameColumn[ColumnTemplate]> */
  @Column({})
  Fname!: string;
  /* </FnameColumn> */

  /* <LnameColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Lname!: string;
  /* </LnameColumn> */

  /* <IsLoggedInColumn[ColumnTemplate]> */
  @Column({
    defaultValue: false,
  })
  IsLoggedIn!: boolean;
  /* </IsLoggedInColumn> */

  /* <StatusColumn[ColumnTemplate]> */
  @Column({
    choices: ["Active", "Paused", "Blocked"],
    defaultValue: "Paused",
  })
  Status!: "Active" | "Paused" | "Blocked";
  /* </StatusColumn> */

  /* <LastAccessColumn[ColumnTemplate]> */
  @Column({})
  LastAccess!: number;
  /* </LastAccessColumn> */

  /* <TagsColumn[ColumnTemplate]> */
  @Column({
    defaultValue: () => [],
  })
  Tags!: Array<string>;
  /* </TagsColumn> */

  /* <RolesColumn[ColumnTemplate]> */
  @Column({
    defaultValue: () => ["User"],
  })
  Roles!: Array<string>;
  /* </RolesColumn> */

  /* <PasswordsColumn[ManyRelationTemplate]> */
  @ManyRelation<Password, User>({
    schema: () => Password,
    mapping: ["UserId", "UserId"],
  })
  Passwords!: Password[];
  /* </PasswordsColumn> */

  /* <ProfileColumn[OneRelationTemplate]> */
  @OneRelation<Profile, User>({
    schema: () => Profile,
    mapping: ["UserId", "UserId"],
  })
  Profile!: Profile;
  /* </ProfileColumn> */

  /* <SubscriptionsColumn[ManyRelationTemplate]> */
  @ManyRelation<Subscription, User>({
    schema: () => Subscription,
    mapping: ["UserId", "UserId"],
  })
  Subscriptions!: Subscription[];
  /* </SubscriptionsColumn> */

  /* <UploadsColumn[ManyRelationTemplate]> */
  @ManyRelation<Upload, User>({
    schema: () => Upload,
    mapping: ["UserId", "UserId"],
  })
  Uploads!: Upload[];
  /* </UploadsColumn> */

  /* /ColumnsContainer */
}
