import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { appConfig } from "./config"
import { generateSchema } from "@graphql"

const bootstrap = async () => {
    const app = await NestFactory.create(AppModule)
    await app.listen(1803 || appConfig().port)
}

generateSchema().then(() => bootstrap())