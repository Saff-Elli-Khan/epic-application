/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { Model, BaseModel, Column } from "@saffellikhan/epic-orm";
/* @ImportsContainer */
/* /ImportsContainer */

@Model<Sample>()
export class Sample extends BaseModel {
  @Column({
    type: String,
    indexes: ["INDEX"],
  })
  createdBy!: string | null;
}
