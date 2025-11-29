(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>LoginPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function LoginPage() {
    _s();
    const [email, setEmail] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [password, setPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [isSignUp, setIsSignUp] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const endpoint = isSignUp ? '/api/auth/register' : '/api/auth/login';
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            if (response.ok) {
                router.push('/dashboard');
                router.refresh();
            } else {
                const data = await response.json();
                setError(data.error || 'An error occurred');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-md w-full space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "mt-6 text-center text-3xl font-extrabold text-gray-900",
                        children: isSignUp ? 'Create your account' : 'Sign in to your account'
                    }, void 0, false, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                        lineNumber: 50,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    className: "mt-8 space-y-6",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "rounded-md shadow-sm -space-y-px",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "email",
                                            className: "sr-only",
                                            children: "Email address"
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "email",
                                            name: "email",
                                            type: "email",
                                            autoComplete: "email",
                                            required: true,
                                            className: "relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",
                                            placeholder: "Email address",
                                            value: email,
                                            onChange: (e)=>setEmail(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                            lineNumber: 60,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "password",
                                            className: "sr-only",
                                            children: "Password"
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                            lineNumber: 73,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            id: "password",
                                            name: "password",
                                            type: "password",
                                            autoComplete: "current-password",
                                            required: true,
                                            className: "relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm",
                                            placeholder: "Password",
                                            value: password,
                                            onChange: (e)=>setPassword(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                    lineNumber: 72,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                            lineNumber: 55,
                            columnNumber: 11
                        }, this),
                        error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-600 text-sm text-center",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                            lineNumber: 91,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: isLoading,
                                className: "group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",
                                children: isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                    lineNumber: 103,
                                    columnNumber: 17
                                }, this) : isSignUp ? 'Sign up' : 'Sign in'
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                                lineNumber: 97,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                            lineNumber: 96,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                    lineNumber: 54,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setIsSignUp(!isSignUp),
                        className: "text-blue-600 hover:text-blue-500 text-sm font-medium",
                        children: isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"
                    }, void 0, false, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                        lineNumber: 112,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
                    lineNumber: 111,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/login/page.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
_s(LoginPage, "0+O0fvNkl9WLsUa5jLgtd6z6wXU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LoginPage;
var _c;
__turbopack_context__.k.register(_c, "LoginPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=code_doubao-seed-1-6-thinking-code-preview-_airtable-clone_a3535b03._.js.map