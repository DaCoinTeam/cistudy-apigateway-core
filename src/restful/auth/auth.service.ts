import { UserMySqlEntity } from "@database"
import {
    InitData,
    SignInRequestBody,
    SignUpRequestBody,
    VerifyGoogleAccessTokenData,
} from "./shared"

export default interface AuthService {
  signIn(data: SignInRequestBody): Promise<UserMySqlEntity>;
  signUp(data: SignUpRequestBody): Promise<string>;
  verifyGoogleAccessToken(data: VerifyGoogleAccessTokenData): Promise<string>;
  init(data: InitData): Promise<UserMySqlEntity>;
}
