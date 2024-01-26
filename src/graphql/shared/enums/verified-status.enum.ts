import { registerEnumType } from "@nestjs/graphql"

enum VerifiedStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}

registerEnumType(VerifiedStatus, {
    name: "VerifiedStatus",
})

export default VerifiedStatus

