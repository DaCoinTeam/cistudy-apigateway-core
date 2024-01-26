import { Resolver, Query, Args } from "@nestjs/graphql"
import { PostModel } from "../shared"
import { FindOnePostInput, FindManyPostInput } from "./shared"

@Resolver(() => PostModel)
export default class PostResolvers {
    constructor(
    ) {}
  @Query(() => PostModel)
    async findOnePost(@Args("input") args: FindOnePostInput) {
        return args
    }

  @Query(() => [PostModel])
  async findManyPosts(
    @Args("input") args: FindManyPostInput,
  ) { 
      return args
  }
}
