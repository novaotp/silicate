import type { Memo as PrismaMemo } from "../../server/node_modules/@prisma/client/default"

export type Memo = Omit<PrismaMemo, "creatorId" | "createdAt">;
