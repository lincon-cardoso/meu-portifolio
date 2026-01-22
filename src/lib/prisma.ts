import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Prefer DATABASE_URL (standard). Keep NEW_DATABASE_URL for backwards compatibility.
const connectionString =
  process.env.DATABASE_URL ?? process.env.NEW_DATABASE_URL;

if (!connectionString) {
  // Avoid throwing during build; log a clear warning so deploy logs are helpful.
  console.warn(
    "Prisma: no database connection string found. Set DATABASE_URL (or NEW_DATABASE_URL) in environment variables.",
  );
}

let adapter: PrismaPg | undefined;
try {
  if (connectionString) {
    adapter = new PrismaPg({ connectionString });
  }
} catch (err) {
  console.error("Prisma: failed to create PrismaPg adapter:", err);
  adapter = undefined;
}

const clientOptions: any = {
  log:
    process.env.APP_ENV === "development"
      ? ["query", "info", "warn", "error"]
      : ["error"],
};

if (adapter) {
  clientOptions.adapter = adapter;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient(clientOptions);

if (process.env.APP_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
