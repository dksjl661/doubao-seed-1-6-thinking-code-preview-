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
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/api/auth/logout/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$auth$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/server/auth-simple.js [app-route] (ecmascript)");
;
async function POST(req) {
    try {
        const cookie = req.headers.get('cookie');
        if (cookie) {
            const sessionCookie = cookie.split(';').find((c)=>c.trim().startsWith('session='));
            if (sessionCookie) {
                const sessionId = sessionCookie.split('=')[1];
                await __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$server$2f$auth$2d$simple$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["auth"].logout({
                    sessionId
                });
            }
        }
        const response = new Response(JSON.stringify({
            message: 'Logout successful'
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        response.headers.set('Set-Cookie', 'session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax');
        return response;
    } catch (error) {
        return new Response(JSON.stringify({
            error: error.message
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__94fa4d00._.js.map