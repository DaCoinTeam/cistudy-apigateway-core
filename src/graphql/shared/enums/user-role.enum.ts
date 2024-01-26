import { registerEnumType } from "@nestjs/graphql"

enum UserRole {
  User = "User",
  Moderator = "Moderator",
  Administrator = "Administrator",
}

registerEnumType(UserRole, {
    name: "UserRole",
})

export default UserRole
