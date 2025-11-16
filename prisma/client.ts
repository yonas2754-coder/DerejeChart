// prisma/client.ts

import { PrismaClient } from '@prisma/client';

// 1. Extend the global scope with the PrismaClient type
// This avoids creating a new instance on every HMR (Hot Module Reload)
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 2. Initialize Prisma Client
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // In production, use a single instance
  prisma = new PrismaClient();
} else {
  // In development, reuse the global instance if available
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

// 3. Export the singleton instance
export default prisma;