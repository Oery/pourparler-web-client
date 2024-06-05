import * as schema from '@lib/db/schema';
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql, { schema });
