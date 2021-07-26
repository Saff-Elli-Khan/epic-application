import { Column, Schema } from "epic-sql";
import { Base } from "../base";

@Schema()
export class Upload extends Base {
  @Column({ index: ["UNIQUE"] })
  uploadId!: number;

  @Column({ nullable: true })
  userId?: string;

  @Column({ choices: ["Local", "Global"] })
  type!: "Local" | "Global";

  @Column({ nullable: true })
  provider?: string;

  @Column()
  mimeType!: string;

  @Column()
  size!: number;

  @Column({ length: null })
  destination!: string;

  @Column({ length: 255 })
  fileName!: string;

  @Column({ length: null })
  path!: string;

  @Column({ nullable: true })
  alt?: string;
}
