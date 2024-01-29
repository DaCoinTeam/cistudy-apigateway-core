import { Global, Module } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlEntity, UserMySqlEntity } from "@database"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthManagerService } from "./services"

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([SessionMySqlEntity, UserMySqlEntity])],
    exports: [
        //base
        JwtService,
        AuthManagerService,
    ],
    providers: [
        //base
        JwtService,
        AuthManagerService,
    ],
})
export default class GlobalModule {}
