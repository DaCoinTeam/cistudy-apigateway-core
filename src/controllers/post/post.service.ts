import { Observable } from "rxjs"
import { CreateData } from "./shared"
import { MessageResponse, SerializableFormData, WithUserId } from "@common"

export default interface CourseService {
  create(
    data: WithUserId<SerializableFormData<CreateData>>,
  ): Observable<MessageResponse>;
}
