import {
  Column,
  ManyRelation,
  OneRelation,
  Schema,
  Utils,
} from "@saffellikhan/epic-sql";
import { Base } from "./Base";
import { Password } from "./Password";
import { Profile } from "./Profile";
import { Subscription } from "./Subscription";
import { Upload } from "./Upload";

@Schema()
export class User extends Base {
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  UserId!: string;

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
    mapping: ["UserId", "UserId"],
  })
  passwords?: Password[];

  @OneRelation<Profile, User>({
    schema: () => Profile,
    mapping: ["UserId", "UserId"],
  })
  profile?: Profile;

  @ManyRelation<Subscription, User>({
    schema: () => Subscription,
    mapping: ["UserId", "UserId"],
  })
  subscriptions?: Subscription[];

  @ManyRelation<Upload, User>({
    schema: () => Upload,
    mapping: ["UserId", "UserId"],
  })
  uploads?: Upload[];
}
