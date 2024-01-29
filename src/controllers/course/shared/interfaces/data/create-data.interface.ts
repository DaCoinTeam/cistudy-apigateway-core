import { ApiProperty } from "@nestjs/swagger"
import { Length } from "class-validator"

export default class CreateData {
  @Length(50)
  @ApiProperty()
      title: string
}
