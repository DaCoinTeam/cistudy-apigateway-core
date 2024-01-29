import { CourseMySqlEntity } from "@database"
import { CreateData } from "./shared"
import { SerializableFormData, WithUserId } from "@common"

export default interface CourseService {
  create(
    data: WithUserId<SerializableFormData<CreateData>>,
  ): Promise<CourseMySqlEntity>;
}
