import {
    Controller,
    Post,
    OnModuleInit,
    UseInterceptors,
    UseGuards,
    Inject,
    UploadedFiles,
} from "@nestjs/common"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiQuery, ApiTags } from "@nestjs/swagger"
import { CreateData, createSchema } from "./shared"
import { ClientGrpc } from "@nestjs/microservices"
import { UserId, AuthInterceptor, JwtAuthGuard, DataFromBody } from "../shared"
import { UserMySqlEntity } from "@database"
import { Files, SerializableFile } from "@common"
import CourseService from "./course.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"

@ApiTags("Course")
@ApiQuery({
    name: "clientId",
    example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
})
@Controller("api/course")
export default class AuthController implements OnModuleInit {
    constructor(@Inject("COURSE_PACKAGE") private client: ClientGrpc) {}

    private courseService: CourseService
    onModuleInit() {
        this.courseService = this.client.getService<CourseService>("CourseService")
    }

  @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ schema: createSchema })
  @Post("create")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AuthInterceptor<UserMySqlEntity>,
    FileFieldsInterceptor([{ name: "files", maxCount: 2 }]),
  )
    async create(
    @UserId() userId: string,
    @DataFromBody() data: CreateData,
    @UploadedFiles() { files }: Files,
    ) {
        const serializableFiles : SerializableFile[] = files.map(file => {
            return {
                fileName: file.originalname,
                data: file.buffer
            }
        })  
        return this.courseService.create({
            userId,
            data,
            files : serializableFiles,
        })
    }
}
