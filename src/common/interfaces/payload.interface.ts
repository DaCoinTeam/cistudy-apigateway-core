import { AuthToken, UserRole } from "../enums"

export default interface Payload {
  userId: string;
  userRole?: UserRole;
  type: AuthToken;
  iat: string;
  exp: string;
}
