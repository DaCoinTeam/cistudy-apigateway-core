import { Module } from "@nestjs/common"
import PostResolvers from "./post.resolvers"

@Module({
    imports: [],
    providers: [PostResolvers],
})
export default class PostGraphQLModule {}
