module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/auth-simple.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Simplified authentication for demonstration
// This uses in-memory storage and doesn't require a database
__turbopack_context__.s([
    "auth",
    ()=>auth
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/crypto [external] (crypto, cjs)");
;
let users = [];
let sessions = [];
let userIdCounter = 1;
let sessionIdCounter = 1;
function hashPassword(password) {
    return (0, __TURBOPACK__imported__module__$5b$externals$5d2f$crypto__$5b$external$5d$__$28$crypto$2c$__cjs$29$__["createHash"])('sha256').update(password).digest('hex');
}
const auth = {
    api: {
        async getSession ({ ctx }) {
            const cookie = ctx?.req?.headers?.cookie;
            if (!cookie) return null;
            const sessionCookie = cookie.split(';').find((c)=>c.trim().startsWith('session='));
            if (!sessionCookie) return null;
            const sessionId = sessionCookie.split('=')[1];
            const session = sessions.find((s)=>s.id === sessionId && s.expiresAt > Date.now());
            if (!session) return null;
            const user = users.find((u)=>u.id === session.userId);
            if (!user) return null;
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name
                }
            };
        }
    },
    async register ({ email, password, name }) {
        const existing = users.find((u)=>u.email === email);
        if (existing) {
            throw new Error('User already exists');
        }
        const user = {
            id: `user_${userIdCounter++}`,
            email,
            password: hashPassword(password),
            name: name || email.split('@')[0],
            createdAt: new Date(),
            updatedAt: new Date()
        };
        users.push(user);
        const session = {
            id: `session_${sessionIdCounter++}`,
            userId: user.id,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
            createdAt: new Date()
        };
        sessions.push(session);
        return {
            user,
            session
        };
    },
    async login ({ email, password }) {
        const user = users.find((u)=>u.email === email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        if (user.password !== hashPassword(password)) {
            throw new Error('Invalid credentials');
        }
        const session = {
            id: `session_${sessionIdCounter++}`,
            userId: user.id,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
            createdAt: new Date()
        };
        sessions.push(session);
        return {
            user,
            session
        };
    },
    async logout ({ sessionId }) {
        const index = sessions.findIndex((s)=>s.id === sessionId);
        if (index !== -1) {
            sessions.splice(index, 1);
        }
    }
};
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/trpc.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "middleware",
    ()=>middleware,
    "protectedProcedure",
    ()=>protectedProcedure,
    "publicProcedure",
    ()=>publicProcedure,
    "router",
    ()=>router
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$DGaJyg8t$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/@trpc/server/dist/initTRPC-DGaJyg8t.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$auth$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/auth-simple.js [app-route] (ecmascript)");
;
;
const t = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$initTRPC$2d$DGaJyg8t$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["initTRPC"].create();
const middleware = t.middleware;
const router = t.router;
const publicProcedure = t.procedure;
const protectedProcedure = t.procedure.use(middleware(async ({ ctx, next })=>{
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$auth$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"].api.getSession({
        ctx
    });
    if (!session) {
        throw new Error('Unauthorized');
    }
    return next({
        ctx: {
            session
        }
    });
}));
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/db/memory.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// In-memory database for demonstration purposes
// This is a simplified version that doesn't require PostgreSQL
__turbopack_context__.s([
    "memoryDb",
    ()=>memoryDb
]);
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
const memoryDb = {
    users: {
        insert: async (values)=>{
            const user = {
                id: `user_${userIdCounter++}`,
                ...values,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            users.push(user);
            return [
                user
            ];
        },
        find: async (where)=>{
            return users.filter((user)=>{
                if (where.email?.equals) {
                    return user.email === where.email.equals;
                }
                return true;
            });
        }
    },
    tables: {
        insert: async (values)=>{
            const table = {
                id: `table_${tableIdCounter++}`,
                ...values,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            tables.push(table);
            return [
                table
            ];
        },
        findMany: async (where)=>{
            return tables.filter((table)=>{
                if (where.userId?.equals) {
                    return table.userId === where.userId.equals;
                }
                return true;
            }).sort((a, b)=>b.createdAt - a.createdAt);
        },
        findFirst: async (where)=>{
            return tables.find((table)=>{
                if (where.id?.equals && where.userId?.equals) {
                    return table.id === where.id.equals && table.userId === where.userId.equals;
                }
                return false;
            });
        }
    },
    columns: {
        insert: async (values)=>{
            const column = {
                id: `column_${columnIdCounter++}`,
                ...values,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            columns.push(column);
            return [
                column
            ];
        },
        findMany: async (where)=>{
            return columns.filter((column)=>{
                if (where.tableId?.equals) {
                    return column.tableId === where.tableId.equals;
                }
                return true;
            }).sort((a, b)=>a.position - b.position);
        },
        findFirst: async (where)=>{
            return columns.find((column)=>{
                if (where.id?.equals) {
                    return column.id === where.id.equals;
                }
                return false;
            });
        },
        delete: async (where)=>{
            const index = columns.findIndex((column)=>column.id === where.id.equals);
            if (index !== -1) {
                const deleted = columns.splice(index, 1);
                return deleted;
            }
            return [];
        }
    },
    rows: {
        insert: async (values)=>{
            const row = {
                id: `row_${rowIdCounter++}`,
                ...values,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            rows.push(row);
            return [
                row
            ];
        },
        findMany: async (where)=>{
            return rows.filter((row)=>{
                if (where.tableId?.equals) {
                    return row.tableId === where.tableId.equals;
                }
                return true;
            }).sort((a, b)=>a.order - b.order);
        },
        findFirst: async (where)=>{
            return rows.find((row)=>{
                if (where.id?.equals) {
                    return row.id === where.id.equals;
                }
                return false;
            });
        },
        delete: async (where)=>{
            const index = rows.findIndex((row)=>row.id === where.id.equals);
            if (index !== -1) {
                const deleted = rows.splice(index, 1);
                return deleted;
            }
            return [];
        }
    },
    cellValues: {
        upsert: async (values)=>{
            const existing = cellValues.find((cell)=>cell.rowId === values.rowId && cell.columnId === values.columnId);
            if (existing) {
                existing.value = values.value;
                existing.updatedAt = new Date();
                return [
                    existing
                ];
            } else {
                const cell = {
                    id: `cell_${cellIdCounter++}`,
                    ...values,
                    createdAt: new Date(),
                    updatedAt: new Date()
                };
                cellValues.push(cell);
                return [
                    cell
                ];
            }
        },
        findMany: async (where)=>{
            return cellValues.filter((cell)=>{
                if (where.rowId?.in) {
                    return where.rowId.in.includes(cell.rowId);
                }
                return true;
            });
        }
    }
};
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/routers/table-simple.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "tableRouter",
    ()=>tableRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/zod/v4/classic/external.js [app-route] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/trpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/db/memory.js [app-route] (ecmascript)");
;
;
;
const tableRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["router"])({
    create: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        description: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().optional()
    })).mutation(async ({ input, ctx })=>{
        const [table] = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.insert({
            name: input.name,
            description: input.description,
            userId: ctx.session.user.id
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.insert({
            tableId: table.id,
            name: 'Name',
            type: 'text',
            position: 0
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.insert({
            tableId: table.id,
            name: 'Notes',
            type: 'text',
            position: 1
        });
        return table;
    }),
    list: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].query(async ({ ctx })=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findMany({
            userId: {
                equals: ctx.session.user.id
            }
        });
    }),
    get: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).query(async ({ input, ctx })=>{
        const table = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findFirst({
            id: {
                equals: input.id
            },
            userId: {
                equals: ctx.session.user.id
            }
        });
        if (!table) throw new Error('Table not found');
        const tableColumns = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.findMany({
            tableId: {
                equals: input.id
            }
        });
        const tableRows = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].rows.findMany({
            tableId: {
                equals: input.id
            }
        });
        const cellValuesMap = new Map();
        if (tableRows.length > 0) {
            const cells = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].cellValues.findMany({
                rowId: {
                    in: tableRows.map((r)=>r.id)
                }
            });
            cells.forEach((cell)=>{
                const key = `${cell.rowId}-${cell.columnId}`;
                cellValuesMap.set(key, cell.value);
            });
        }
        const rowsWithCells = tableRows.map((row)=>{
            const cells = {};
            tableColumns.forEach((col)=>{
                const key = `${row.id}-${col.id}`;
                cells[col.id] = cellValuesMap.get(key) ?? null;
            });
            return {
                ...row,
                cells
            };
        });
        return {
            ...table,
            columns: tableColumns,
            rows: rowsWithCells
        };
    }),
    addColumn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        tableId: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        name: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().min(1),
        type: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string().default('text'),
        position: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number().optional()
    })).mutation(async ({ input, ctx })=>{
        const table = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findFirst({
            id: {
                equals: input.tableId
            },
            userId: {
                equals: ctx.session.user.id
            }
        });
        if (!table) throw new Error('Table not found');
        const existingColumns = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.findMany({
            tableId: {
                equals: input.tableId
            }
        });
        const position = input.position ?? (existingColumns.length > 0 ? Math.max(...existingColumns.map((c)=>c.position)) + 1 : 0);
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.insert({
            tableId: input.tableId,
            name: input.name,
            type: input.type,
            position
        });
    }),
    deleteColumn: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ input, ctx })=>{
        const column = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.findFirst({
            id: {
                equals: input.id
            }
        });
        if (!column) throw new Error('Column not found');
        const table = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findFirst({
            id: {
                equals: column.tableId
            },
            userId: {
                equals: ctx.session.user.id
            }
        });
        if (!table) throw new Error('Unauthorized');
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].columns.delete({
            id: {
                equals: input.id
            }
        });
    }),
    addRow: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        tableId: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ input, ctx })=>{
        const table = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findFirst({
            id: {
                equals: input.tableId
            },
            userId: {
                equals: ctx.session.user.id
            }
        });
        if (!table) throw new Error('Table not found');
        const existingRows = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].rows.findMany({
            tableId: {
                equals: input.tableId
            }
        });
        const order = existingRows.length > 0 ? Math.max(...existingRows.map((r)=>r.order)) + 1 : 0;
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].rows.insert({
            tableId: input.tableId,
            order
        });
    }),
    deleteRow: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        id: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
    })).mutation(async ({ input, ctx })=>{
        const row = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].rows.findFirst({
            id: {
                equals: input.id
            }
        });
        if (!row) throw new Error('Row not found');
        const table = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findFirst({
            id: {
                equals: row.tableId
            },
            userId: {
                equals: ctx.session.user.id
            }
        });
        if (!table) throw new Error('Unauthorized');
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].rows.delete({
            id: {
                equals: input.id
            }
        });
    }),
    updateCell: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["protectedProcedure"].input(__TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
        rowId: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        columnId: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
        value: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].any()
    })).mutation(async ({ input, ctx })=>{
        const row = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].rows.findFirst({
            id: {
                equals: input.rowId
            }
        });
        if (!row) throw new Error('Row not found');
        const table = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].tables.findFirst({
            id: {
                equals: row.tableId
            },
            userId: {
                equals: ctx.session.user.id
            }
        });
        if (!table) throw new Error('Unauthorized');
        return __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$db$2f$memory$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["memoryDb"].cellValues.upsert({
            rowId: input.rowId,
            columnId: input.columnId,
            value: input.value
        });
    })
});
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/routers/_app.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appRouter",
    ()=>appRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/trpc.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$routers$2f$table$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/routers/table-simple.js [app-route] (ecmascript)");
;
;
const appRouter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$trpc$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["router"])({
    table: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$routers$2f$table$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["tableRouter"]
}); // Type exports are not supported in pure JavaScript
 // export type AppRouter = typeof appRouter;
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/api/trpc/[trpc]/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>handler,
    "POST",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/@trpc/server/dist/adapters/fetch/index.mjs [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$routers$2f$_app$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/routers/_app.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$auth$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/auth-simple.js [app-route] (ecmascript)");
;
;
;
const handler = (req)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f40$trpc$2f$server$2f$dist$2f$adapters$2f$fetch$2f$index$2e$mjs__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchRequestHandler"])({
        endpoint: '/api/trpc',
        req,
        router: __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$routers$2f$_app$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appRouter"],
        createContext: async ()=>{
            const session = await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$auth$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"].api.getSession({
                req
            });
            return {
                session
            };
        }
    });
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__fdc35637._.js.map