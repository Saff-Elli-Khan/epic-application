/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

/* @ImportsContainer */
/* /ImportsContainer */

import { Model, BaseModel, Column } from "@saffellikhan/epic-orm";

@Model<Sample>()
export class Sample extends BaseModel {
  @Column({
    type: String,
    indexes: ["INDEX"],
  })
  createdBy!: string | null;
}
