import { PrismaClient } from "@prisma/client"
import { JWTUser } from "./modules/auth"

export type Context = {
  dataSources: {
    db: PrismaClient
  }
  user: JWTUser | null
}