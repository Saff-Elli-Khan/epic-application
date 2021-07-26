import { Column, OneRelation, Schema } from "epic-sql";
import { Base } from "../base";
import { User } from "./user";

@Schema()
export class Notification extends Base {
  @Column({ index: ["UNIQUE"] })
  notificationId!: number;

  @Column()
  userId!: number;

  @Column({
    choices: ["Success", "Info", "Warning", "Danger"],
    defaultValue: "Info",
  })
  type!: "Success" | "Info" | "Warning" | "Danger";

  @Column({ defaultValue: () => ({ en: "N/A" }) })
  subject?: Record<string, string>;

  @Column({ defaultValue: () => ({ en: "N/A" }) })
  message?: Record<string, string>;

  @Column({ defaultValue: false })
  seen!: boolean;

  @Column({ defaultValue: false })
  important!: boolean;

  @Column({ defaultValue: () => ({}) })
  metadata!: Record<string, any>;

  @OneRelation<User, Notification>({
    schema: () => User,
    mapping: ["userId", "userId"],
  })
  user?: User;
}
