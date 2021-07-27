import { Column, Schema } from "epic-sql";
import { Base } from "../Base";

@Schema()
export class Password extends Base {
  @Column({ index: ["UNIQUE"] })
  PasswordId!: number;

  @Column()
  UserId!: string;

  @Column({ length: null })
  value!: string;

  @Column({ choices: ["Valid", "Expired"] })
  status!: "Valid" | "Expired";
}
