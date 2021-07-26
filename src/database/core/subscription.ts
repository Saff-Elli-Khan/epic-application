import { Column, OneRelation, Schema } from "epic-sql";
import { Base } from "../base";
import { User } from "./user";

@Schema()
export class Subscription extends Base {
  @Column({ index: ["UNIQUE"] })
  subscriptionId!: number;

  @Column()
  userId!: string;

  @Column({ choices: ["Email", "Contact"] })
  type!: "Email" | "Contact";

  @Column()
  value!: string;

  @Column({ defaultValue: false })
  isVerified!: boolean;

  @Column({ defaultValue: false })
  allowNewsLetters!: boolean;

  @OneRelation<User, Subscription>({
    schema: () => User,
    mapping: ["userId", "userId"],
  })
  user?: User;
}
