import React from "react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { User } from "./types";
import { shortenId } from "@/lib/utils/shortenId";
import { AdminAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

interface UsersTableProps {
  users: User[];
  onRefresh?: () => void;
}

export function UsersTable({ users, onRefresh }: UsersTableProps) {
  const handleDelete = async (userId: string, userName: string) => {
    if (!confirm(`Are you sure you want to delete user "${userName}"?`)) return;
    try {
      await AdminAPI.deleteUser(userId);
      toast.success("User deleted successfully");
      if (onRefresh) onRefresh();
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleEdit = (user: User) => {
    // Placeholder for edit functionality
    toast(`Edit user: ${user.name}`);
  };

  return (
    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="px-6 py-4 w-12">
                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500"
                  />
                </div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                User ID
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sessions
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 border-slate-300 rounded text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap" title={user.id}>
                    {shortenId(user.id)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        user.role === "Student"
                          ? "text-blue-500"
                          : "text-purple-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap">
                    <span
                      className={`font-medium ${
                        user.status === "Active"
                          ? "text-emerald-500"
                          : "text-red-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {user.sessions}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-400 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(user)}
                        className="p-1 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-blue-600"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="p-1 rounded-md hover:bg-slate-100 transition-colors text-slate-400 hover:text-red-600"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-1 rounded-md hover:bg-slate-100 transition-colors">
                        <MoreHorizontal className="w-5 h-5 text-slate-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
