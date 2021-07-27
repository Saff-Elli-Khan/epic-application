import { Column, OneRelation, Schema, Utils } from "@saffellikhan/epic-sql";
import { Base } from "./Base";
import { Upload } from "./Upload";
import { User } from "./User";

@Schema()
export class Avatar extends Base {
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  AvatarId!: number;

  @Column()
  UserId!: string;

  @Column()
  UploadId!: number;

  @OneRelation<User, Avatar>({
    schema: () => User,
    mapping: ["UserId", "UserId"],
  })
  user?: User;

  @OneRelation<Upload, Avatar>({
    schema: () => Upload,
    mapping: ["UploadId", "UploadId"],
  })
  upload?: Upload;
}
