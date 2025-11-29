import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { tables, columns, rows, cellValues } from '../../db/schema';
import { db } from '../../db';
import { eq, and, desc, asc, sql } from 'drizzle-orm';

export const tableRouter = router({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [table] = await db.insert(tables).values({
        name: input.name,
        description: input.description,
        userId: ctx.session.user.id,
      }).returning();

      await db.insert(columns).values([
        {
          tableId: table.id,
          name: 'Name',
          type: 'text',
          position: 0,
        },
        {
          tableId: table.id,
          name: 'Notes',
          type: 'text',
          position: 1,
        },
      ]);

      return table;
    }),

  list: protectedProcedure
    .query(async ({ ctx }) => {
      return db.select().from(tables).where(eq(tables.userId, ctx.session.user.id)).orderBy(desc(tables.createdAt));
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const table = await db.select().from(tables).where(and(eq(tables.id, input.id), eq(tables.userId, ctx.session.user.id))).limit(1);
      if (!table[0]) throw new Error('Table not found');

      const tableColumns = await db.select().from(columns).where(eq(columns.tableId, input.id)).orderBy(asc(columns.position));
      const tableRows = await db.select().from(rows).where(eq(rows.tableId, input.id)).orderBy(asc(rows.order));

      const cellValuesMap = new Map();
      if (tableRows.length > 0) {
        const cells = await db.select().from(cellValues).where(eq(cellValues.rowId, { in: tableRows.map(r => r.id) }));
        cells.forEach(cell => {
          const key = `${cell.rowId}-${cell.columnId}`;
          cellValuesMap.set(key, cell.value);
        });
      }

      const rowsWithCells = tableRows.map(row => {
        const cells = {};
        tableColumns.forEach(col => {
          const key = `${row.id}-${col.id}`;
          cells[col.id] = cellValuesMap.get(key) ?? null;
        });
        return { ...row, cells };
      });

      return {
        ...table[0],
        columns: tableColumns,
        rows: rowsWithCells,
      };
    }),

  addColumn: protectedProcedure
    .input(z.object({
      tableId: z.string(),
      name: z.string().min(1),
      type: z.string().default('text'),
      position: z.number().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const table = await db.select().from(tables).where(and(eq(tables.id, input.tableId), eq(tables.userId, ctx.session.user.id))).limit(1);
      if (!table[0]) throw new Error('Table not found');

      const maxPosition = await db.select({ max: sql`max(position)` }).from(columns).where(eq(columns.tableId, input.tableId));
      const position = input.position ?? (maxPosition[0].max ?? 0) + 1;

      return db.insert(columns).values({
        tableId: input.tableId,
        name: input.name,
        type: input.type,
        position,
      }).returning();
    }),

  deleteColumn: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const column = await db.select({ tableId: columns.tableId }).from(columns).where(eq(columns.id, input.id)).limit(1);
      if (!column[0]) throw new Error('Column not found');

      const table = await db.select().from(tables).where(and(eq(tables.id, column[0].tableId), eq(tables.userId, ctx.session.user.id))).limit(1);
      if (!table[0]) throw new Error('Unauthorized');

      return db.delete(columns).where(eq(columns.id, input.id)).returning();
    }),

  addRow: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const table = await db.select().from(tables).where(and(eq(tables.id, input.tableId), eq(tables.userId, ctx.session.user.id))).limit(1);
      if (!table[0]) throw new Error('Table not found');

      const maxOrder = await db.select({ max: sql`max("order")` }).from(rows).where(eq(rows.tableId, input.tableId));
      const order = (maxOrder[0].max ?? 0) + 1;

      return db.insert(rows).values({
        tableId: input.tableId,
        order,
      }).returning();
    }),

  deleteRow: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const row = await db.select({ tableId: rows.tableId }).from(rows).where(eq(rows.id, input.id)).limit(1);
      if (!row[0]) throw new Error('Row not found');

      const table = await db.select().from(tables).where(and(eq(tables.id, row[0].tableId), eq(tables.userId, ctx.session.user.id))).limit(1);
      if (!table[0]) throw new Error('Unauthorized');

      return db.delete(rows).where(eq(rows.id, input.id)).returning();
    }),

  updateCell: protectedProcedure
    .input(z.object({
      rowId: z.string(),
      columnId: z.string(),
      value: z.any(),
    }))
    .mutation(async ({ input, ctx }) => {
      const row = await db.select({ tableId: rows.tableId }).from(rows).where(eq(rows.id, input.rowId)).limit(1);
      if (!row[0]) throw new Error('Row not found');

      const table = await db.select().from(tables).where(and(eq(tables.id, row[0].tableId), eq(tables.userId, ctx.session.user.id))).limit(1);
      if (!table[0]) throw new Error('Unauthorized');

      const existingCell = await db.select().from(cellValues).where(and(eq(cellValues.rowId, input.rowId), eq(cellValues.columnId, input.columnId))).limit(1);

      if (existingCell[0]) {
        return db.update(cellValues)
          .set({ value: input.value })
          .where(eq(cellValues.id, existingCell[0].id))
          .returning();
      } else {
        return db.insert(cellValues)
          .values({
            rowId: input.rowId,
            columnId: input.columnId,
            value: input.value,
          })
          .returning();
      }
    }),
});