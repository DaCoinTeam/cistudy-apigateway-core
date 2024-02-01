import { UserMySqlEntity } from "@database"
import {
    InitData,
    SignInRequestBody,
    SignUpRequestBody,
    VerifyGoogleAccessTokenData,
} from "./shared"
import { MessageResponse } from "@common"
import { Observable } from "rxjs"

export default interface AuthService {
  signIn(data: SignInRequestBody): Observable<UserMySqlEntity>;
  signUp(data: SignUpRequestBody): Observable<MessageResponse>;
  verifyGoogleAccessToken(
    data: VerifyGoogleAccessTokenData,
  ): Observable<MessageResponse>;
  init(data: InitData): Observable<UserMySqlEntity>;
}
