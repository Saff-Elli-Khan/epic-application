import {
  Column,
  Schema,
  OneRelation,
  ManyRelation,
  Utils,
} from "@saffellikhan/epic-sql";
import { Base } from "@AppPath/schemas/Base";

@Schema()
export class Sample extends Base {
  /* @SampleColumn */
  @Column({})
  Sample!: any;
  /* @SampleColumn */

  /* @DynamicColumns */

  /* /DynamicColumns */
}
