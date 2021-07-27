import { Column, OneRelation, Schema, Utils } from "@saffellikhan/epic-sql";
import { Base } from "./Base";
import { User } from "./User";

@Schema()
export class Profile extends Base {
  @Column({ index: ["UNIQUE"], defaultValue: () => Utils.uuidShort() })
  ProfileId!: number;

  @Column()
  UserId!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  contact?: number;

  @Column({ nullable: true })
  occupation?: string;

  @Column({ nullable: true })
  business?: string;

  @Column({ nullable: true })
  website?: string;

  @Column({ nullable: true, length: null })
  bio?: string;

  @Column({ nullable: true })
  birthDate?: number;

  @Column({ choices: ["Male", "Female", "Unknown"], defaultValue: "Unknown" })
  gender!: "Male" | "Female" | "Unknown";

  @Column({ nullable: true })
  country?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  address_1?: string;

  @Column({ nullable: true })
  address_2?: string;

  @Column({
    defaultValue: () => ({
      facebook: null,
      twitter: null,
      linkedIn: null,
      instagram: null,
      youtube: null,
    }),
  })
  socialLinks!: {
    facebook: string | null;
    twitter: string | null;
    linkedIn: string | null;
    instagram: string | null;
    youtube: string | null;
  };

  @OneRelation<User, Profile>({
    schema: () => User,
    mapping: ["UserId", "UserId"],
  })
  user?: User;
}
