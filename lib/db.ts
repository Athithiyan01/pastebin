// lib/db.ts
import { Pool } from "pg";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,

  // Neon requires SSL
  ssl: {
    rejectUnauthorized: false,
  },

  // IMPORTANT for Neon + PgBouncer
  max: 1,

  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

export default pool;
