export interface AuthorizationPayload {
  userId: string;
  fname: string;
  lname: string;
  status: "Active" | "Paused";
  permissions: string[];
}
