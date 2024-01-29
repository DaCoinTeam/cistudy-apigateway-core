import { Global, Module } from "@nestjs/common"
import { AuthManagerService } from "./base"
import { JwtService } from "@nestjs/jwt"
import { SessionMySqlEntity, UserMySqlEntity } from "@database"
import { TypeOrmModule } from "@nestjs/typeorm"

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([SessionMySqlEntity, UserMySqlEntity])],
    exports: [
        //base
        AuthManagerService,
        JwtService,
    ],
    providers: [
        //base
        AuthManagerService,
        JwtService,
    ],
})
export default class GlobalServicesModule {}
