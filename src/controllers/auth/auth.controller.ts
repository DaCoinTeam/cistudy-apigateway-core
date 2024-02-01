import {
    Body,
    Controller,
    Post,
    OnModuleInit,
    UseInterceptors,
    UseGuards,
    Get,
    Inject,
    Query,
} from "@nestjs/common"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import { SignInInput, SignUpInput } from "./shared"
import { ClientGrpc } from "@nestjs/microservices"
import AuthService from "./auth.service"
import {
    UserId,
    AuthInterceptor,
    JwtAuthGuard,
    GenerateAuthTokensInterceptor,
} from "../shared"
import { UserMySqlEntity } from "@database"

@ApiTags("Auth")
@ApiQuery({
    name: "clientId",
    example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
})
@Controller("api/auth")
export default class AuthController implements OnModuleInit {
    constructor(@Inject("AUTH_PACKAGE") private client: ClientGrpc) {}

    //authService là kết nối với server grpc
    private authService: AuthService
    onModuleInit() {
        this.authService = this.client.getService<AuthService>("AuthService")
    }

  @Post("sign-in")
  @UseInterceptors(GenerateAuthTokensInterceptor<UserMySqlEntity>)
    async signIn(@Body() body: SignInInput) {
        return this.authService.signIn(body)
    }

  @Post("sign-up")
  @UseInterceptors(GenerateAuthTokensInterceptor<UserMySqlEntity>)
  async signUp(@Body() body: SignUpInput) {
      return this.authService.signUp(body)
  }

  @Get("verify-google-access-token")
  @UseInterceptors(GenerateAuthTokensInterceptor)
  async verifyGoogleAccessToken(@Query("token") token: string) {
      return this.authService.verifyGoogleAccessToken({ token })
  }

  @ApiBearerAuth()
  @Get("init")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  async init(@UserId() userId: string) {
      return this.authService.init({ userId })
  }
}
