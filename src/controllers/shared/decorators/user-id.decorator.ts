import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { Payload } from "@common"

const UserId = createParamDecorator((_, ctx: ExecutionContext) : string => {
    const request = ctx.switchToHttp().getRequest()
    const { userId } = request.user as Payload
    return userId
})

export default UserId