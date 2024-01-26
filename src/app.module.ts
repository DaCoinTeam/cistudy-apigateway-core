import { appConfig } from "@config"
import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { PostGraphQLModule } from "./graphql"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig],
        }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            typePaths: ["./**/*.gql"],
        }),

        //graphql
        PostGraphQLModule,
    ],
    controllers: [],
    providers: [],

    //graphql
})
export class AppModule {}
