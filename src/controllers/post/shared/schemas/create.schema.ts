import { SchemaObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface"

const createSchema : SchemaObject = {
    type: "object",
    properties: {
        data: {
            type: "object",
            properties: {
                title: {
                    type: "string",
                },
                description: {
                    type: "string",
                },
                price: {
                    type: "number"
                }
            },
        },
        files: {
            type: "array",
            items: {
                type: "string",
                format: "binary"
            },
        },
    }
}

export default createSchema