import { Column, OneRelation, Schema } from "epic-sql";
import { Base } from "../Base";
import { User } from "./User";

@Schema()
export class Subscription extends Base {
  @Column({ index: ["UNIQUE"] })
  SubscriptionId!: number;

  @Column()
  UserId!: string;

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
    mapping: ["UserId", "UserId"],
  })
  user?: User;
}
