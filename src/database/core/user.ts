import { Column, ManyRelation, OneRelation, Schema } from "epic-sql";
import { Base } from "../base";
import { Password } from "./password";
import { Profile } from "./profile";
import { Subscription } from "./subscription";
import { Upload } from "./upload";

@Schema()
export class User extends Base {
  @Column({ index: ["UNIQUE"] })
  userId!: string;

  @Column()
  fname!: string;

  @Column()
  lname!: string;

  fullName() {
    return `${this.fname} ${this.lname || ""}`.trim();
  }

  @Column({
    choices: ["Offline", "Online"],
  })
  activity!: "Offline" | "Online";

  @Column({
    choices: ["Active", "Paused", "Blocked"],
  })
  status!: "Active" | "Paused" | "Blocked";

  @Column()
  lastAccess!: number;

  @Column()
  tags!: string[];

  @ManyRelation<Password, User>({
    schema: () => Password,
    mapping: ["userId", "userId"],
  })
  passwords?: Password[];

  @OneRelation<Profile, User>({
    schema: () => Profile,
    mapping: ["userId", "userId"],
  })
  profile?: Profile;

  @ManyRelation<Subscription, User>({
    schema: () => Subscription,
    mapping: ["userId", "userId"],
  })
  subscriptions?: Subscription[];

  @ManyRelation<Upload, User>({
    schema: () => Upload,
    mapping: ["userId", "userId"],
  })
  uploads?: Upload[];
}
