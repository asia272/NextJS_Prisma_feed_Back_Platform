// import { PrismaClient } from "@prisma/client";

// /* eslint-disable no-var */
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// export const prisma =
//   global.prisma ||
//   new PrismaClient({
//     log: ["error", "warn"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }
// export default prisma;

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["error", "warn"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
export default prisma;