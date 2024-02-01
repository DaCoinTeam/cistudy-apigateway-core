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
//import { servicesConfig } from "@config"
import { ConfigModule } from "@nestjs/config"
import { servicesConfig } from "@config"

@Module({
    imports: [
        //gateway là client vì gateway nó gọi request từ 1 server grpc
        // nó là client, reigster
        // tạo ra 1 kết nối với server cung cấp package auth với đường dẫn tới proto như dưới
        // tao tạo kết nối giữa gateway này và thằng server ở dưới
        ClientsModule.registerAsync(
            [{
                name: "AUTH_PACKAGE",
                imports: [ConfigModule],
                useFactory: async () => ({
                    transport: Transport.GRPC,
                    options: {
                        url: "0.0.0.0:3002",
                        package: "auth",
                        protoPath: join(
                            process.env.NODE_ENV === "production"
                                ? process.cwd()
                                : servicesConfig().restful.path,
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
