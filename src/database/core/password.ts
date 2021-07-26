import { Column, Schema } from "epic-sql";
import { Base } from "../base";

@Schema()
export class Password extends Base {
  @Column({ index: ["UNIQUE"] })
  passwordId!: number;

  @Column()
  userId!: string;

  @Column({ length: null })
  value!: string;

  @Column({ choices: ["Valid", "Expired"] })
  status!: "Valid" | "Expired";
}
