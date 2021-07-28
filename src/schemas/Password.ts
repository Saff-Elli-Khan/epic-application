import { Column, Schema, Utils } from "@saffellikhan/epic-sql";
import { Base } from "./Base";

@Schema()
export class Password extends Base {
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  PasswordId!: number;

  @Column()
  UserId!: string;

  @Column({ length: null })
  value!: string;

  @Column({ choices: ["Valid", "Expired"] })
  status!: "Valid" | "Expired";
}
