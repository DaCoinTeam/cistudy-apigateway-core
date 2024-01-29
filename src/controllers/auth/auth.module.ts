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

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "AUTH_PACKAGE",
                transport: Transport.GRPC,
                options: {
                    package: "auth",
                    protoPath: join(
                        process.cwd(),
                        "protos",
                        "services",
                        "auth",
                        "auth.service.proto",
                    ),
                },
            },
        ]),
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
