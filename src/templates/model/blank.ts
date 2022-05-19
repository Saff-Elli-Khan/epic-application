/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import { Model, BaseModel, Field } from "@oridune/epic-odm";

@Model<Sample>()
export class Sample extends BaseModel {
  @Field()
  createdBy!: string;
}
