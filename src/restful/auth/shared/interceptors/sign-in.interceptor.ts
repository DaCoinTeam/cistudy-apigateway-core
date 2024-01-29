import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common"
import { Response } from "@shared"
import { Observable, mergeMap } from "rxjs"
import { SignInRequestBody } from "../interfaces"
import { AuthManagerService } from "@global"

@Injectable()
export default class SignInInterceptor
implements NestInterceptor
{
    constructor(private readonly authManagerService: AuthManagerService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<Response<SignInRequestBody>>> {
        const request = context.switchToHttp().getRequest()
        const query = request.query

        const clientId = query.clientId as string | undefined

        return next.handle().pipe(
            mergeMap(async (data) => {
                return await this.authManagerService.generateResponse<SignInRequestBody>(
                    data.userId,
                    data,
                    true,
                    clientId,
                )
            }),
        )
    }
}
