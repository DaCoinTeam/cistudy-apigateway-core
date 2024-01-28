import { Body, Controller, Post, UseInterceptors } from "@nestjs/common"
import { ApiQuery, ApiTags } from "@nestjs/swagger"
import { SignInRequestBody } from "./interfaces"
import { SignInInterceptor }  from "./interceptors"

@ApiTags("Auth")
@Controller("api/auth")
export default class AuthController {

  //post - sign-in
  @ApiQuery({
  	name: "clientId",
  	example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
  })
  @Post("sign-in")
  @UseInterceptors(SignInInterceptor)
    async signIn(@Body() body: SignInRequestBody) {
  	return null
    }
}
