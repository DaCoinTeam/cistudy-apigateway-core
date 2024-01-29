import { Module } from "@nestjs/common"

import { TypeOrmModule } from "@nestjs/typeorm"
import {
    CourseMySqlEntity,
    EnrolledInfoMySqlEntity,
    LectureMySqlEntity,
    PostCommentContentMySqlEntity,
    PostCommentLikeMySqlEntity,
    PostCommentMySqlEntity,
    PostContentMySqlEntity,
    PostLikeMySqlEntity,
    PostMySqlEntity,
    ResourceMySqlEntity,
    SectionMySqlEnitiy,
    SessionMySqlEntity,
    UserMySqlEntity,
} from "@database"
import { AuthModule } from "./auth"

@Module({
    imports: [
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
            PostCommentLikeMySqlEntity
        ]),
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export default class RestfulModule {}
