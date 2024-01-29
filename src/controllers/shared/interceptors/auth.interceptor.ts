import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common"
import { AuthManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { AuthToken, Payload, Response } from "@shared"

@Injectable()
export default class AuthInterceptor<T extends object>
implements NestInterceptor<T, Response<T>>
{
    constructor(
        private readonly authManagerService: AuthManagerService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<Response<T>>> {
        const request = context.switchToHttp().getRequest()
        const query = request.query

        const { userId, type } = request.user as Payload

        const clientId = query.clientId as string | undefined
        const refresh = type === AuthToken.Refresh
        if (refresh) {
            await this.authManagerService.validateSession(userId, clientId)
        }

        return next.handle().pipe(
            mergeMap(async (data) => {
                return await this.authManagerService.generateResponse<T>(
                    userId,
                    data,
                    refresh,
                    clientId,
                )
            }),
        )
    }
}
