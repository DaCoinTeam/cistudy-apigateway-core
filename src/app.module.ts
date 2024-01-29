import { appConfig, databaseConfig, serviceConfig } from "@config"
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from "@nestjs/apollo"
import { IntrospectAndCompose } from "@apollo/gateway"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ControllersModule } from "@controllers"
import { GlobalModule } from "@global"
import { GrpcServerExceptionFilter, GrpcToHttpInterceptor } from "nestjs-grpc-exceptions"
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core"

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
            synchronize: false,
        }),

        // GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
        //     driver: ApolloGatewayDriver,
        //     server: {
        //         playground: true
        //     },
        //     gateway: {
        //         supergraphSdl: new IntrospectAndCompose({
        //             subgraphs: [
        //                 {
        //                     name: "graphql",
        //                     url: `http://${serviceConfig().graphql.host}:${serviceConfig().graphql.port}/graphql`,
        //                 },
        //             ],
        //         }),
        //     },
        // }),
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
