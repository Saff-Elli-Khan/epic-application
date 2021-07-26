import { Column, OneRelation, Schema } from "epic-sql";
import { Base } from "../base";
import { Upload } from "./upload";
import { User } from "./user";

@Schema()
export class Avatar extends Base {
  @Column({ index: ["UNIQUE"] })
  avatarId!: number;

  @Column()
  userId!: string;

  @Column()
  uploadId!: number;

  @OneRelation<User, Avatar>({
    schema: () => User,
    mapping: ["userId", "userId"],
  })
  user?: User;

  @OneRelation<Upload, Avatar>({
    schema: () => Upload,
    mapping: ["uploadId", "uploadId"],
  })
  upload?: Upload;
}
