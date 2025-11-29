(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$trpc$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/trpc/client.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function DashboardPage() {
    _s();
    const [showCreateModal, setShowCreateModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newTableName, setNewTableName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newTableDescription, setNewTableDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { data: tables, isLoading, refetch } = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$trpc$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trpc"].table.list.useQuery();
    const createTable = __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$src$2f$trpc$2f$client$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["trpc"].table.create.useMutation({
        onSuccess: {
            "DashboardPage.useMutation[createTable]": ()=>{
                setShowCreateModal(false);
                setNewTableName('');
                setNewTableDescription('');
                refetch();
            }
        }["DashboardPage.useMutation[createTable]"]
    });
    const handleCreateTable = async (e)=>{
        e.preventDefault();
        if (newTableName.trim()) {
            await createTable.mutateAsync({
                name: newTableName.trim(),
                description: newTableDescription.trim()
            });
        }
    };
    const handleSignOut = async ()=>{
        await fetch('/api/auth/logout', {
            method: 'POST'
        });
        router.push('/login');
        router.refresh();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-white shadow-sm border-b border-gray-200",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center h-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                    className: "text-xl font-semibold text-gray-900",
                                    children: "Airtable Clone"
                                }, void 0, false, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                    lineNumber: 45,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSignOut,
                                className: "btn btn-secondary",
                                children: "Sign Out"
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 47,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                    lineNumber: 42,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                lineNumber: 41,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-bold text-gray-900",
                                children: "Your Tables"
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 59,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCreateModal(true),
                                className: "btn btn-primary",
                                children: "+ Create Table"
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                        lineNumber: 58,
                        columnNumber: 9
                    }, this),
                    isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center items-center h-64",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"
                        }, void 0, false, {
                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                        lineNumber: 69,
                        columnNumber: 11
                    }, this) : tables?.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center py-12",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-lg font-medium text-gray-900 mb-2",
                                children: "No tables yet"
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-gray-500 mb-6",
                                children: "Create your first table to get started"
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCreateModal(true),
                                className: "btn btn-primary",
                                children: "+ Create Table"
                            }, void 0, false, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                        lineNumber: 73,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
                        children: tables?.map((table)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                onClick: ()=>router.push(`/table/${table.id}`),
                                className: "bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-gray-900 mb-2",
                                        children: table.name
                                    }, void 0, false, {
                                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                        lineNumber: 91,
                                        columnNumber: 17
                                    }, this),
                                    table.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-gray-600 text-sm mb-4",
                                        children: table.description
                                    }, void 0, false, {
                                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                        lineNumber: 93,
                                        columnNumber: 19
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm text-gray-500",
                                        children: [
                                            "Created ",
                                            new Date(table.createdAt).toLocaleDateString()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                        lineNumber: 95,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, table.id, true, {
                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                lineNumber: 86,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                        lineNumber: 84,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            showCreateModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg p-6 w-full max-w-md",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "text-lg font-medium text-gray-900 mb-4",
                            children: "Create New Table"
                        }, void 0, false, {
                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                            lineNumber: 108,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                            onSubmit: handleCreateTable,
                            className: "space-y-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                            children: "Table Name"
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                            lineNumber: 111,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newTableName,
                                            onChange: (e)=>setNewTableName(e.target.value),
                                            className: "input",
                                            placeholder: "Enter table name",
                                            required: true
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                            lineNumber: 114,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                    lineNumber: 110,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-sm font-medium text-gray-700 mb-1",
                                            children: "Description (Optional)"
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                            lineNumber: 124,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            value: newTableDescription,
                                            onChange: (e)=>setNewTableDescription(e.target.value),
                                            className: "input resize-none",
                                            rows: 3,
                                            placeholder: "Enter table description"
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                            lineNumber: 127,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                    lineNumber: 123,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex justify-end space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            onClick: ()=>setShowCreateModal(false),
                                            className: "btn btn-secondary",
                                            children: "Cancel"
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                            lineNumber: 136,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "submit",
                                            disabled: createTable.isLoading,
                                            className: "btn btn-primary",
                                            children: createTable.isLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
                                            }, void 0, false, {
                                                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                                lineNumber: 149,
                                                columnNumber: 21
                                            }, this) : 'Create Table'
                                        }, void 0, false, {
                                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                                    lineNumber: 135,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                            lineNumber: 109,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                    lineNumber: 107,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
                lineNumber: 106,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/src/app/dashboard/page.jsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "A1uXu1KCZW52MaJVpgyiFElWEfs=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$code$2f$doubao$2d$seed$2d$1$2d$6$2d$thinking$2d$code$2d$preview$2d2f$airtable$2d$clone$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardPage;
var _c;
__turbopack_context__.k.register(_c, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/code/doubao-seed-1-6-thinking-code-preview-/airtable-clone/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=code_doubao-seed-1-6-thinking-code-preview-_airtable-clone_ee048098._.js.map