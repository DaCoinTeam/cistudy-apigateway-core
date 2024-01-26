import { registerEnumType } from "@nestjs/graphql"

enum ContentType {
  Text = "Text",
  Video = "Video",
  Code = "Code",
  Image = "Image",
  Label = "Label",
  Application = "Application",
}

registerEnumType(ContentType, {
    name: "ContentType",
})

export default ContentType