import { Module } from "@nestjs/common"
import CourseController from "./course.controller"
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
                name: "COURSE_PACKAGE",
                transport: Transport.GRPC,
                options: {
                    package: "course",
                    protoPath: join(
                        process.cwd(),
                        "protos",
                        "services",
                        "course",
                        "course.service.proto",
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
    controllers: [CourseController],
    providers: [],
})
export default class CourseModule {}
