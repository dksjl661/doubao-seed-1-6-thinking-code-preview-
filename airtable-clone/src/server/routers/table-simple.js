import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { memoryDb } from '../../db/memory';

export const tableRouter = router({
  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1),
      description: z.string().optional(),
    }))
    .mutation(async ({ input, ctx }) => {
      const [table] = await memoryDb.tables.insert({
        name: input.name,
        description: input.description,
        userId: ctx.session.user.id,
      });

      await memoryDb.columns.insert({
        tableId: table.id,
        name: 'Name',
        type: 'text',
        position: 0,
      });

      await memoryDb.columns.insert({
        tableId: table.id,
        name: 'Notes',
        type: 'text',
        position: 1,
      });

      return table;
    }),

  list: protectedProcedure
    .query(async ({ ctx }) => {
      return memoryDb.tables.findMany({
        userId: { equals: ctx.session.user.id },
      });
    }),

  get: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const table = await memoryDb.tables.findFirst({
        id: { equals: input.id },
        userId: { equals: ctx.session.user.id },
      });

      if (!table) throw new Error('Table not found');

      const tableColumns = await memoryDb.columns.findMany({
        tableId: { equals: input.id },
      });

      const tableRows = await memoryDb.rows.findMany({
        tableId: { equals: input.id },
      });

      const cellValuesMap = new Map();
      if (tableRows.length > 0) {
        const cells = await memoryDb.cellValues.findMany({
          rowId: { in: tableRows.map(r => r.id) },
        });
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
        ...table,
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
      const table = await memoryDb.tables.findFirst({
        id: { equals: input.tableId },
        userId: { equals: ctx.session.user.id },
      });

      if (!table) throw new Error('Table not found');

      const existingColumns = await memoryDb.columns.findMany({
        tableId: { equals: input.tableId },
      });

      const position = input.position ?? (existingColumns.length > 0 ? Math.max(...existingColumns.map(c => c.position)) + 1 : 0);

      return memoryDb.columns.insert({
        tableId: input.tableId,
        name: input.name,
        type: input.type,
        position,
      });
    }),

  deleteColumn: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const column = await memoryDb.columns.findFirst({
        id: { equals: input.id },
      });

      if (!column) throw new Error('Column not found');

      const table = await memoryDb.tables.findFirst({
        id: { equals: column.tableId },
        userId: { equals: ctx.session.user.id },
      });

      if (!table) throw new Error('Unauthorized');

      return memoryDb.columns.delete({
        id: { equals: input.id },
      });
    }),

  addRow: protectedProcedure
    .input(z.object({ tableId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const table = await memoryDb.tables.findFirst({
        id: { equals: input.tableId },
        userId: { equals: ctx.session.user.id },
      });

      if (!table) throw new Error('Table not found');

      const existingRows = await memoryDb.rows.findMany({
        tableId: { equals: input.tableId },
      });

      const order = existingRows.length > 0 ? Math.max(...existingRows.map(r => r.order)) + 1 : 0;

      return memoryDb.rows.insert({
        tableId: input.tableId,
        order,
      });
    }),

  deleteRow: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const row = await memoryDb.rows.findFirst({
        id: { equals: input.id },
      });

      if (!row) throw new Error('Row not found');

      const table = await memoryDb.tables.findFirst({
        id: { equals: row.tableId },
        userId: { equals: ctx.session.user.id },
      });

      if (!table) throw new Error('Unauthorized');

      return memoryDb.rows.delete({
        id: { equals: input.id },
      });
    }),

  updateCell: protectedProcedure
    .input(z.object({
      rowId: z.string(),
      columnId: z.string(),
      value: z.any(),
    }))
    .mutation(async ({ input, ctx }) => {
      const row = await memoryDb.rows.findFirst({
        id: { equals: input.rowId },
      });

      if (!row) throw new Error('Row not found');

      const table = await memoryDb.tables.findFirst({
        id: { equals: row.tableId },
        userId: { equals: ctx.session.user.id },
      });

      if (!table) throw new Error('Unauthorized');

      return memoryDb.cellValues.upsert({
        rowId: input.rowId,
        columnId: input.columnId,
        value: input.value,
      });
    }),
});