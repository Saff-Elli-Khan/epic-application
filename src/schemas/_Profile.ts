/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <ColumnTemplate> @Column({{ options }}) {{ name }}!: {{ datatype }}; </ColumnTemplate> */
/* <OneRelationTemplate> @OneRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}; </OneRelationTemplate> */
/* <ManyRelationTemplate> @ManyRelation<{{ relation }}, {{ schema }}>({ schema: () => {{ relation }}, mapping: {{ mapping }} }) {{ name }}!: {{ relation }}[]; </ManyRelationTemplate> */

import { Base } from "./base";
/* @ImportsContainer */
/* <ProfileImport[ImportsTemplate]> */
import {
  Schema,
  Column,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
/* </ProfileImport> */

/* <UserImport[ImportsTemplate]> */
import { User } from "./User";
/* </UserImport> */

/* /ImportsContainer */

@Schema()
export class Profile extends Base {
  /* @ColumnsContainer */
  /* <ProfileIdColumn[ColumnTemplate]> */
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  ProfileId!: number;
  /* </ProfileIdColumn> */

  /* <UserIdColumn[ColumnTemplate]> */
  @Column({})
  UserId!: string;
  /* </UserIdColumn> */

  /* <EmailColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Email!: string;
  /* </EmailColumn> */

  /* <ContactColumn[ColumnTemplate]> */
  @Column({
    length: 15,
    nullable: true,
  })
  Contact!: number;
  /* </ContactColumn> */

  /* <OccupationColumn[ColumnTemplate]> */
  @Column({
    length: 255,
    nullable: true,
  })
  Occupation!: string;
  /* </OccupationColumn> */

  /* <BusinessColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Business!: string;
  /* </BusinessColumn> */

  /* <WebsiteColumn[ColumnTemplate]> */
  @Column({
    length: 255,
    nullable: true,
  })
  Website!: string;
  /* </WebsiteColumn> */

  /* <BioColumn[ColumnTemplate]> */
  @Column({
    length: 255,
    nullable: true,
  })
  Bio!: string;
  /* </BioColumn> */

  /* <BirthTimestampColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  BirthTimestamp!: number;
  /* </BirthTimestampColumn> */

  /* <GenderColumn[ColumnTemplate]> */
  @Column({
    choices: ["Male", "Female", "Unknown"],
    defaultValue: "Unknown",
  })
  Gender!: "Male" | "Female" | "Unknown";
  /* </GenderColumn> */

  /* <CountryColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Country!: string;
  /* </CountryColumn> */

  /* <StateColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  State!: string;
  /* </StateColumn> */

  /* <CityColumn[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  City!: string;
  /* </CityColumn> */

  /* <Address_1Column[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Address_1!: string;
  /* </Address_1Column> */

  /* <Address_2Column[ColumnTemplate]> */
  @Column({
    nullable: true,
  })
  Address_2!: string;
  /* </Address_2Column> */

  /* <SocialLinksColumn[ColumnTemplate]> */
  @Column({
    defaultValue: () => ({}),
  })
  SocialLinks!: Record<string, string>;
  /* </SocialLinksColumn> */

  /* <UserColumn[OneRelationTemplate]> */
  @OneRelation<User, Profile>({
    schema: () => User,
    mapping: ["UserId", "UserId"],
  })
  User!: User;
  /* </UserColumn> */

  /* /ColumnsContainer */
}
