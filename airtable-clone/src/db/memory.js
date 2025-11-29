// In-memory database for demonstration purposes
// This is a simplified version that doesn't require PostgreSQL

let users = [];
let tables = [];
let columns = [];
let rows = [];
let cellValues = [];

let userIdCounter = 1;
let tableIdCounter = 1;
let columnIdCounter = 1;
let rowIdCounter = 1;
let cellIdCounter = 1;

export const memoryDb = {
  users: {
    insert: async (values) => {
      const user = {
        id: `user_${userIdCounter++}`,
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
      return [user];
    },
    find: async (where) => {
      return users.filter(user => {
        if (where.email?.equals) {
          return user.email === where.email.equals;
        }
        return true;
      });
    },
  },

  tables: {
    insert: async (values) => {
      const table = {
        id: `table_${tableIdCounter++}`,
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      tables.push(table);
      return [table];
    },
    findMany: async (where) => {
      return tables.filter(table => {
        if (where.userId?.equals) {
          return table.userId === where.userId.equals;
        }
        return true;
      }).sort((a, b) => b.createdAt - a.createdAt);
    },
    findFirst: async (where) => {
      return tables.find(table => {
        if (where.id?.equals && where.userId?.equals) {
          return table.id === where.id.equals && table.userId === where.userId.equals;
        }
        return false;
      });
    },
  },

  columns: {
    insert: async (values) => {
      const column = {
        id: `column_${columnIdCounter++}`,
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      columns.push(column);
      return [column];
    },
    findMany: async (where) => {
      return columns.filter(column => {
        if (where.tableId?.equals) {
          return column.tableId === where.tableId.equals;
        }
        return true;
      }).sort((a, b) => a.position - b.position);
    },
    findFirst: async (where) => {
      return columns.find(column => {
        if (where.id?.equals) {
          return column.id === where.id.equals;
        }
        return false;
      });
    },
    delete: async (where) => {
      const index = columns.findIndex(column => column.id === where.id.equals);
      if (index !== -1) {
        const deleted = columns.splice(index, 1);
        return deleted;
      }
      return [];
    },
  },

  rows: {
    insert: async (values) => {
      const row = {
        id: `row_${rowIdCounter++}`,
        ...values,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      rows.push(row);
      return [row];
    },
    findMany: async (where) => {
      return rows.filter(row => {
        if (where.tableId?.equals) {
          return row.tableId === where.tableId.equals;
        }
        return true;
      }).sort((a, b) => a.order - b.order);
    },
    findFirst: async (where) => {
      return rows.find(row => {
        if (where.id?.equals) {
          return row.id === where.id.equals;
        }
        return false;
      });
    },
    delete: async (where) => {
      const index = rows.findIndex(row => row.id === where.id.equals);
      if (index !== -1) {
        const deleted = rows.splice(index, 1);
        return deleted;
      }
      return [];
    },
  },

  cellValues: {
    upsert: async (values) => {
      const existing = cellValues.find(
        cell => cell.rowId === values.rowId && cell.columnId === values.columnId
      );

      if (existing) {
        existing.value = values.value;
        existing.updatedAt = new Date();
        return [existing];
      } else {
        const cell = {
          id: `cell_${cellIdCounter++}`,
          ...values,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        cellValues.push(cell);
        return [cell];
      }
    },
    findMany: async (where) => {
      return cellValues.filter(cell => {
        if (where.rowId?.in) {
          return where.rowId.in.includes(cell.rowId);
        }
        return true;
      });
    },
  },
};