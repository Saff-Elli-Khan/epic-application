/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */

import { Model, BaseModel } from "@saffellikhan/epic-orm";
/* @ImportsContainer */
/* /ImportsContainer */

@Model<Sample>()
export class Sample extends BaseModel {}
