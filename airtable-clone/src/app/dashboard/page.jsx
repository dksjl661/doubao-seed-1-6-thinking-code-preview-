'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '../../trpc/client';

export default function DashboardPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const [newTableDescription, setNewTableDescription] = useState('');
  const router = useRouter();

  const { data: tables, isLoading, refetch } = trpc.table.list.useQuery();
  const createTable = trpc.table.create.useMutation({
    onSuccess: () => {
      setShowCreateModal(false);
      setNewTableName('');
      setNewTableDescription('');
      refetch();
    },
  });

  const handleCreateTable = async (e) => {
    e.preventDefault();
    if (newTableName.trim()) {
      await createTable.mutateAsync({
        name: newTableName.trim(),
        description: newTableDescription.trim(),
      });
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Airtable Clone</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Tables</h2>
          <button
            onClick={() => setShowCreateModal(true)}
            className="btn btn-primary"
          >
            + Create Table
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        ) : tables?.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tables yet</h3>
            <p className="text-gray-500 mb-6">Create your first table to get started</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              + Create Table
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tables?.map((table) => (
              <div
                key={table.id}
                onClick={() => router.push(`/table/${table.id}`)}
                className="bg-white border border-gray-200 rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{table.name}</h3>
                {table.description && (
                  <p className="text-gray-600 text-sm mb-4">{table.description}</p>
                )}
                <div className="text-sm text-gray-500">
                  Created {new Date(table.createdAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Table Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Table</h3>
            <form onSubmit={handleCreateTable} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Table Name
                </label>
                <input
                  type="text"
                  value={newTableName}
                  onChange={(e) => setNewTableName(e.target.value)}
                  className="input"
                  placeholder="Enter table name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  value={newTableDescription}
                  onChange={(e) => setNewTableDescription(e.target.value)}
                  className="input resize-none"
                  rows={3}
                  placeholder="Enter table description"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTable.isLoading}
                  className="btn btn-primary"
                >
                  {createTable.isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    'Create Table'
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