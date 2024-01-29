import { CourseMySqlEntity } from "@database"
import { CreateData } from "./shared"
import { FormDataRequestBody, WithUserId } from "@common"

export default interface CourseService {
  create(
    data: WithUserId<FormDataRequestBody<CreateData>>,
  ): Promise<CourseMySqlEntity>;
}
