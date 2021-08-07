/* <ImportsTemplate> import { {{ modules }} } from "{{ location }}"; </ImportsTemplate> */
/* <SchemaTemplate> {{ schema }}, </SchemaTemplate> */

/* @ImportsContainer */
/* <AvatarImport[ImportsTemplate]> */
import { Avatar } from "./Avatar";
/* </AvatarImport> */

/* <NotificationImport[ImportsTemplate]> */
import { Notification } from "./Notification";
/* </NotificationImport> */

/* <PasswordImport[ImportsTemplate]> */
import { Password } from "./Password";
/* </PasswordImport> */

/* <ProfileImport[ImportsTemplate]> */
import { Profile } from "./Profile";
/* </ProfileImport> */

/* <SubscriptionImport[ImportsTemplate]> */
import { Subscription } from "./Subscription";
/* </SubscriptionImport> */

/* <UploadImport[ImportsTemplate]> */
import { Upload } from "./Upload";
/* </UploadImport> */

/* <UserImport[ImportsTemplate]> */
import { User } from "./User";
/* </UserImport> */

/* /ImportsContainer */

export const SchemaList = [
  /* @SchemasContainer */
/* <AvatarSchema[SchemaTemplate]> */
Avatar,
/* </AvatarSchema> */

/* <NotificationSchema[SchemaTemplate]> */
Notification,
/* </NotificationSchema> */

/* <PasswordSchema[SchemaTemplate]> */
Password,
/* </PasswordSchema> */

/* <ProfileSchema[SchemaTemplate]> */
Profile,
/* </ProfileSchema> */

/* <SubscriptionSchema[SchemaTemplate]> */
Subscription,
/* </SubscriptionSchema> */

/* <UploadSchema[SchemaTemplate]> */
Upload,
/* </UploadSchema> */

/* <UserSchema[SchemaTemplate]> */
User,
/* </UserSchema> */

/* /SchemasContainer */
];