import { appConfig, databaseConfig, jwtConfig, servicesConfig } from "@config"
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from "@nestjs/apollo"
import { IntrospectAndCompose } from "@apollo/gateway"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ControllersModule } from "@controllers"
import { GlobalModule } from "@global"
import { GrpcToHttpInterceptor } from "nestjs-grpc-exceptions"
import { APP_INTERCEPTOR } from "@nestjs/core"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, servicesConfig, databaseConfig, jwtConfig],
        }),

        TypeOrmModule.forRoot({
            type: "mysql",
            host: databaseConfig().mysql.host,
            port: +databaseConfig().mysql.port,
            username: databaseConfig().mysql.username,
            password: databaseConfig().mysql.password,
            database: databaseConfig().mysql.schema,
            autoLoadEntities: true,
            synchronize: false,
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
        GlobalModule,
        ControllersModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: GrpcToHttpInterceptor,
        },
    ],
})
export class AppModule {}
