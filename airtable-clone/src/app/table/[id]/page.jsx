'use client';

import { useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { trpc } from '../../../trpc/client';
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const PAGE_SIZE = 50;

export default function TablePage() {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [newColumnName, setNewColumnName] = useState('');
  const [showAddColumn, setShowAddColumn] = useState(false);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } = useInfiniteQuery({
    queryKey: ['table', params.id],
    queryFn: async ({ pageParam = 0 }) => {
      const table = await trpc.table.get.fetch({ id: params.id });
      const startIndex = pageParam * PAGE_SIZE;
      const endIndex = startIndex + PAGE_SIZE;
      return {
        ...table,
        rows: table.rows.slice(startIndex, endIndex),
        nextCursor: table.rows.length > endIndex ? pageParam + 1 : undefined,
      };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  const addRow = trpc.table.addRow.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const deleteRow = trpc.table.deleteRow.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const addColumn = trpc.table.addColumn.useMutation({
    onSuccess: () => {
      setShowAddColumn(false);
      setNewColumnName('');
      refetch();
    },
  });

  const deleteColumn = trpc.table.deleteColumn.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const updateCell = trpc.table.updateCell.useMutation({
    onMutate: async ({ rowId, columnId, value }) => {
      await queryClient.cancelQueries({ queryKey: ['table', params.id] });

      const previousData = queryClient.getQueryData(['table', params.id]);

      queryClient.setQueryData(['table', params.id], (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            rows: page.rows.map(row =>
              row.id === rowId
                ? { ...row, cells: { ...row.cells, [columnId]: value } }
                : row
            ),
          })),
        };
      });

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['table', params.id], context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['table', params.id] });
    },
  });

  const handleCellChange = async (rowId, columnId, value) => {
    await updateCell.mutateAsync({ rowId, columnId, value });
  };

  const handleScroll = useCallback((e) => {
    const target = e.target;
    if (target.scrollHeight - target.scrollTop - target.clientHeight < 500) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const tableData = data?.pages.flatMap(page => page.rows) || [];
  const tableColumns = data?.pages[0]?.columns || [];

  if (!data?.pages[0]) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const table = data.pages[0];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/dashboard')}
                className="text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{table.name}</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddColumn(true)}
                className="btn btn-secondary"
              >
                + Add Column
              </button>
              <button
                onClick={() => addRow.mutateAsync({ tableId: params.id })}
                disabled={addRow.isLoading}
                className="btn btn-primary"
              >
                + Add Row
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div
          className="bg-white rounded-lg shadow overflow-hidden"
          style={{ maxHeight: 'calc(100vh - 12rem)', overflow: 'auto' }}
          onScroll={handleScroll}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  {tableColumns.map((column) => (
                    <th key={column.id} className="table-header">
                      <div className="flex justify-between items-center">
                        <span>{column.name}</span>
                        <button
                          onClick={() => deleteColumn.mutateAsync({ id: column.id })}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    </th>
                  ))}
                  <th className="table-header w-16">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tableData.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {tableColumns.map((column) => (
                      <td key={`${row.id}-${column.id}`} className="table-cell">
                        <input
                          type={column.type === 'number' ? 'number' : 'text'}
                          value={row.cells[column.id] ?? ''}
                          onChange={(e) => handleCellChange(row.id, column.id, e.target.value)}
                          className="w-full bg-transparent focus:outline-none"
                          placeholder={`Enter ${column.name.toLowerCase()}...`}
                        />
                      </td>
                    ))}
                    <td className="table-cell">
                      <button
                        onClick={() => deleteRow.mutateAsync({ id: row.id })}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {isFetchingNextPage && (
                  <tr>
                    <td colSpan={tableColumns.length + 1} className="text-center py-4">
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Column Modal */}
      {showAddColumn && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Column</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newColumnName.trim()) {
                  addColumn.mutateAsync({
                    tableId: params.id,
                    name: newColumnName.trim(),
                  });
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Column Name
                </label>
                <input
                  type="text"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  className="input"
                  placeholder="Enter column name"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddColumn(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={addColumn.isLoading}
                  className="btn btn-primary"
                >
                  {addColumn.isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Add Column'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}