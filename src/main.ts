import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { appConfig } from "./config"

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    app.enableCors()
    
    await app.listen(3001 || appConfig().port)
}

bootstrap()