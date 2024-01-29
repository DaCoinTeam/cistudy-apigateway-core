import {
    Body,
    Controller,
    Post,
    OnModuleInit,
    UseInterceptors,
    UseGuards,
    Get,
    Inject,
} from "@nestjs/common"
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger"
import {
    SignInRequestBody,
    SignUpRequestBody,
    SignInInterceptor,
} from "./shared"
import { ClientGrpc } from "@nestjs/microservices"
import AuthService from "./auth.service"
import { UserId, AuthInterceptor, JwtAuthGuard } from "../shared"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController implements OnModuleInit {
    constructor(@Inject("AUTH_PACKAGE") private client: ClientGrpc) {}

    private authService: AuthService
    onModuleInit() {
        this.authService = this.client.getService<AuthService>("AuthService")
    }

  //post - sign-in
  @ApiQuery({
      name: "clientId",
      example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @Post("sign-in")
  @UseInterceptors(SignInInterceptor)
    async signIn(@Body() body: SignInRequestBody) {
        return this.authService.signIn(body)
    }

  //post - sign-up
  @ApiQuery({
      name: "clientId",
      example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @Post("sign-up")
  @UseInterceptors(AuthInterceptor)
  async signUp(@Body() body: SignUpRequestBody) {
      return this.authService.signUp(body)
  }

  //post - verify-google-acess-token
  //   @Get("sign-up")
  //   @UseInterceptors(SignInInterceptor)
  //   async verifyGoogleAccessToken(@Body() body: SignUpRequestBody) {
  //       return this.authService.signUp(body)
  //   }

  //get - init
  @ApiQuery({
      name: "clientId",
      example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @ApiBearerAuth()
  @Get("init")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(AuthInterceptor)
  async init(@UserId() userId: string) {
      return await this.authService.init({ userId })
  }
}
