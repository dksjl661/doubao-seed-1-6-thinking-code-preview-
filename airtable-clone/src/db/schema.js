import { sql } from 'drizzle-orm';
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  email: text('email').notNull(),
  password: text('password'),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const tables = pgTable('tables', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  userId: uuid('user_id')
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const columns = pgTable('columns', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  tableId: uuid('table_id')
    .references(() => tables.id, { onDelete: 'cascade' })
    .notNull(),
  name: text('name').notNull(),
  type: text('type').notNull().default('text'),
  position: integer('position').notNull().default(0),
  isRequired: boolean('is_required').notNull().default(false),
  defaultValue: text('default_value'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rows = pgTable('rows', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  tableId: uuid('table_id')
    .references(() => tables.id, { onDelete: 'cascade' })
    .notNull(),
  order: integer('order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const cellValues = pgTable('cell_values', {
  id: uuid('id').default(sql`gen_random_uuid()`).primaryKey(),
  rowId: uuid('row_id')
    .references(() => rows.id, { onDelete: 'cascade' })
    .notNull(),
  columnId: uuid('column_id')
    .references(() => columns.id, { onDelete: 'cascade' })
    .notNull(),
  value: jsonb('value'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});