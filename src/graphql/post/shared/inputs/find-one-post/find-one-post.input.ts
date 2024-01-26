import { Field, ID, InputType } from "@nestjs/graphql"
import { IsUUID } from "class-validator"

@InputType()
export default class FindOnePostInput {
  @Field(() => ID)
  @IsUUID()
  	postId: string
}