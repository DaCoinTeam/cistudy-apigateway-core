import { Module } from "@nestjs/common"
import AuthController from "./auth.controller"

import { TypeOrmModule } from "@nestjs/typeorm"
import { SessionMySqlEntity } from "@database"

@Module({
    imports: [TypeOrmModule.forFeature([SessionMySqlEntity])],
    controllers: [AuthController],
    providers: [],
})
export default class AuthModule {}
