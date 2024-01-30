import { Module } from "@nestjs/common"
import AuthController from "./auth.controller"
import { TypeOrmModule } from "@nestjs/typeorm"
import {
    SessionMySqlEntity,
    UserMySqlEntity,
    PostMySqlEntity,
    CourseMySqlEntity,
    EnrolledInfoMySqlEntity,
    SectionMySqlEnitiy,
    LectureMySqlEntity,
    ResourceMySqlEntity,
    PostContentMySqlEntity,
    PostCommentMySqlEntity,
    PostCommentContentMySqlEntity,
    PostLikeMySqlEntity,
    PostCommentLikeMySqlEntity,
} from "@database"
import { ClientsModule, Transport } from "@nestjs/microservices"
import { join } from "path"
import { servicesConfig } from "@config"
import { ConfigModule } from "@nestjs/config"

@Module({
    imports: [
        ClientsModule.registerAsync(
            [{
                name: "AUTH_PACKAGE",
                imports: [ConfigModule],
                useFactory: async () => ({
                    transport: Transport.GRPC,
                    options: {
                        package: "auth",
                        protoPath: join(
                            servicesConfig().restful.path,
                            "protos",
                            "services",
                            "auth",
                            "auth.service.proto",
                        ),
                    },
                })}
            ]
        ),
        TypeOrmModule.forFeature([
            SessionMySqlEntity,
            UserMySqlEntity,
            PostMySqlEntity,
            CourseMySqlEntity,
            EnrolledInfoMySqlEntity,
            SectionMySqlEnitiy,
            LectureMySqlEntity,
            ResourceMySqlEntity,
            PostContentMySqlEntity,
            PostCommentMySqlEntity,
            PostCommentContentMySqlEntity,
            PostLikeMySqlEntity,
            PostCommentLikeMySqlEntity,
        ]),
    ],
    controllers: [AuthController],
    providers: [],
})
export default class AuthModule {}
