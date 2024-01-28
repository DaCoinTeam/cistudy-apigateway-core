import { appConfig, servicesConfig } from "@config"
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from "@nestjs/apollo"
import { IntrospectAndCompose } from "@apollo/gateway"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, servicesConfig],
        }),
        GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
            driver: ApolloGatewayDriver,
            server: {
                playground: true
            },
            gateway: {
                supergraphSdl: new IntrospectAndCompose({
                    subgraphs: [
                        {
                            name: "graphql",
                            url: `http://${servicesConfig().graphql.host}:${servicesConfig().graphql.port}/graphql`,
                        },
                    ],
                }),
            },
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
