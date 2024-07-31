import type { User as PrismaUser } from "../../server/node_modules/@prisma/client/default"

export type User = Omit<PrismaUser, "password" | "updatedAt">;
