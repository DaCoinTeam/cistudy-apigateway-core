import SerializableFile from "./serializable-file.interface"

export default interface FormDataRequestBody<T extends object> {
    data: T,
    files: SerializableFile[]
}