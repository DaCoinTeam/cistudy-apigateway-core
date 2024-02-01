import { UserMySqlEntity } from "@database"
import {
    InitInput,
    SignInInput,
    SignUpInput,
    VerifyGoogleAccessTokenInput,
} from "./shared"
import { MessageResponse } from "@common"
import { Observable } from "rxjs"

export default interface AuthService {
  signIn(data: SignInInput): Observable<UserMySqlEntity>;
  signUp(data: SignUpInput): Observable<MessageResponse>;
  verifyGoogleAccessToken(
    data: VerifyGoogleAccessTokenInput,
  ): Observable<MessageResponse>;
  init(data: InitInput): Observable<UserMySqlEntity>;
}
