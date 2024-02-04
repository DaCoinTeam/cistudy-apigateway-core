import { Observable } from "rxjs"
import { CreateCourseInput, CreateLectureInput, CreateSectionInput } from "./shared"
import { MessageResponse } from "@common"

export default interface CourseService {
  createCourse(
    input: CreateCourseInput,
  ): Observable<MessageResponse>;
  createSection(
    input: CreateSectionInput
  ) : Observable<MessageResponse>;
  createLecture(
    input: CreateLectureInput
  ) : Observable<MessageResponse>;
} 
 