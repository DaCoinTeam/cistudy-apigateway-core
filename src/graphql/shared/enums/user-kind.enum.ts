import { registerEnumType } from "@nestjs/graphql"

enum UserKind {
  Local = "Local",
  Google = "Google",
  Facebook = "Facebook",
}

registerEnumType(UserKind, {
    name: "UserKind",
})

export default UserKind
