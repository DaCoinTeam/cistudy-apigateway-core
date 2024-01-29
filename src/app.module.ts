import { appConfig, databaseConfig, serviceConfig } from "@config"
import { ApolloGatewayDriverConfig, ApolloGatewayDriver } from "@nestjs/apollo"
import { IntrospectAndCompose } from "@apollo/gateway"
import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { GraphQLModule } from "@nestjs/graphql"
import { TypeOrmModule } from "@nestjs/typeorm"
import { RestfulModule } from "@restful"
import { GlobalServicesModule } from "@global"
import { join } from "path"
import { ClientsModule, Transport } from "@nestjs/microservices"

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [appConfig, serviceConfig, databaseConfig],
        }),

        ClientsModule.register([
            {
                name: "AUTH_PACKAGE",
                transport: Transport.GRPC,
                options: {
                    package: "auth",
                    protoPath: join(
                        process.cwd(),
                        "protos",
                        "services",
                        "auth",
                        "auth.service.proto",
                    ),
                },
            },
        ]),

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
        
        RestfulModule,
        GlobalServicesModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
