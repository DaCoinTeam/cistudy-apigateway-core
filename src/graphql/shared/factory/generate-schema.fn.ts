import {
    GraphQLSchemaBuilderModule,
    GraphQLSchemaFactory,
} from "@nestjs/graphql"
import { PostResolvers } from "../../post"
import { NestFactory } from "@nestjs/core"
import { promises as fsPromises } from "fs"
import { join } from "path"
import { printSchema } from "graphql"

const generateSchema = async () => {
    const app = await NestFactory.create(GraphQLSchemaBuilderModule)
    await app.init()

    const gqlSchemaFactory = app.get(GraphQLSchemaFactory)
    const schema = await gqlSchemaFactory.create([PostResolvers])
    console.log(process.env.NODE_ENV)
    await fsPromises.writeFile(
        join(
            process.cwd(),
            `${process.env.NODE_ENV === "production" ? "dist" : "src"}/schema.gql`,
        ),
        printSchema(schema),
    )
}

export default generateSchema
