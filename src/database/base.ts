import { Schema, Column, BaseSchema, PrimaryKey } from "epic-sql";

@Schema()
export class Base extends BaseSchema {
  @PrimaryKey()
  public id?: number;

  @Column({ defaultValue: () => Date.now() })
  public createdOn?: number;

  @Column({
    defaultValue: () => Date.now(),
    onUpdate: () => Date.now(),
  })
  public modifedOn?: number;
}
