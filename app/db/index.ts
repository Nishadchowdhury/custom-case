import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

// this is the proper way to initialize prisma. We are caching prisma to avoid multiple initialization.
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }

  prisma = global.cachedPrisma;
} // end of proper way.

export const db = prisma; // I can also do this. _export const db = new PrismaClient();_
