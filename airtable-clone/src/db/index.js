import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '../env';

// For development purposes, we'll use a simple client
// In production, you'd want to use a connection pool
const connectionString = env.DATABASE_URL || 'postgresql://username:password@localhost:5432/airtable_clone';

// Create a singleton client
const sql = postgres(connectionString, { max: 1 });

export const db = drizzle(sql);