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
import CourseService from "./post.service"
import { FileFieldsInterceptor } from "@nestjs/platform-express"

@ApiTags("Post")
@ApiQuery({
    name: "clientId",
    example: "4e2fa8d7-1f75-4fad-b500-454a93c78935",
})
@Controller("api/post")
export default class PostController implements OnModuleInit {
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
        const serializableFiles : Array<SerializableFile> = files.map(file => {
            return {
                fileName: file.originalname,
                fileBody: file.buffer
            }
        })  
        return this.courseService.create({
            userId,
            data,
            files : serializableFiles,
        })
    }

    @ApiBearerAuth()
  @ApiConsumes("multipart/form-data")
  @ApiBody({ schema: createSchema })
  @Post("create2")
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    AuthInterceptor<UserMySqlEntity>,
    FileFieldsInterceptor([{ name: "files", maxCount: 2 }]),
  )
  async create2(
    @UserId() userId: string,
    @DataFromBody() data: CreateData,
    @UploadedFiles() { files }: Files,
  ) {
      const serializableFiles : Array<SerializableFile> = files.map(file => {
          return {
              fileName: file.originalname,
              fileBody: file.buffer
          }
      })  
      return this.courseService.create({
          userId,
          data,
          files : serializableFiles,
      })
  }
}
