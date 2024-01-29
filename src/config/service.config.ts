export default () => {
    return {
        graphql: {
            host: process.env.SERVICE_GRAPHQL_HOST,
            port: process.env.SERVICE_GRAPHQL_PORT
        },
        restful: {
            host: process.env.SERVICE_RESTFUL_HOST,
            port: process.env.SERVICE_RESTFUL_PORT
        }
    }
}