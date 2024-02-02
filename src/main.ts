import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { appConfig   } from "./config"
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.enableCors()

    const config = new DocumentBuilder()
        .setTitle("CiStudy API Gateway")
        .setDescription(
            "...",
        )
        .setVersion("1.0")
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)

    SwaggerModule.setup("/", app, document, {
        swaggerOptions: { defaultModelsExpandDepth: -1 },
    })

    await app.listen(3001 || appConfig().port)
}

bootstrap()