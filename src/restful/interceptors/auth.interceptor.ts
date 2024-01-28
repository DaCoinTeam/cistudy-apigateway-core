import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from "@nestjs/common"
import { AuthManagerService } from "@global"
import { Observable, mergeMap } from "rxjs"
import { AuthToken, Response, ValidatedResult } from "@shared"
import { InjectRepository } from "@nestjs/typeorm"
import { UserMySqlEntity } from "@database"
import { Repository } from "typeorm"

@Injectable()
export default class AuthInterceptor<T extends object>
implements NestInterceptor<T, Response<T>>
{
    constructor(
        @InjectRepository(UserMySqlEntity)
        private readonly userMySqlRepository: Repository<UserMySqlEntity>,
        private readonly authManagerService: AuthManagerService) {}

    async intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Promise<Observable<Response<T>>> {
        const request = context.switchToHttp().getRequest()
        const query = request.query

        const { user, type } = request.user as ValidatedResult

        const clientId = query.clientId as string | undefined
        const refresh = type === AuthToken.Refresh
        if (refresh) {
            await this.authManagerService.validateSession(user.userId, clientId)
        }

        return next.handle().pipe(
            mergeMap(async (data) => {
                return await this.authManagerService.generateResponse<T>(
                    user.userId,
                    data,
                    refresh,
                    clientId,
                )
            }),
        )
    }
}
