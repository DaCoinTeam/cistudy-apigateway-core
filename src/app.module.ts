import { appConfig, databaseConfig, serviceConfig } from "@config"
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from "@nestjs/apollo"
import { IntrospectAndCompose } from "@apollo/gateway"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthRestfulModule } from "./restful"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, serviceConfig, databaseConfig],
        }),

        TypeOrmModule.forRoot({
            type: "mysql",
            host: databaseConfig().mysql.host,
            port: +databaseConfig().mysql.port,
            username: databaseConfig().mysql.username,
            password: databaseConfig().mysql.password,
            database: databaseConfig().mysql.schema,
            autoLoadEntities: true,
            synchronize: false
        }),
        
        AuthRestfulModule,
        
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
                            url: `http://${serviceConfig().graphql.host}:${serviceConfig().graphql.port}/graphql`,
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
