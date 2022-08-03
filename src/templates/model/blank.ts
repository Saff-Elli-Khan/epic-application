import { Model, BaseModel, Field } from "@oridune/epic-odm";

@Model<SampleModel>()
export class SampleModel extends BaseModel {
  @Field()
  accountId!: string;

  @Field()
  createdBy!: string;
}
