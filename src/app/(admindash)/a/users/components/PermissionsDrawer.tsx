import React from "react";
import { X, Shield, Check, Minus } from "lucide-react";
import { permissionsRoles } from "./data";

interface PermissionsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PermissionsDrawer({ isOpen, onClose }: PermissionsDrawerProps) {
  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-[800px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-3 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-slate-700" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Roles & Permissions
              </h2>
              <p className="text-sm text-slate-500">6 roles · 14 users</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-200 bg-white">
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 w-48 font-inter">
                    Role
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Users
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Sessions
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Assignments
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    View<br/>Analytics
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Billing
                  </th>
                  <th className="px-4 py-4 text-xs font-semibold text-slate-500 text-center">
                    Manage<br/>Settings
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {permissionsRoles.map((role) => (
                  <tr key={role.role} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-md ${role.bgColor} ${role.iconColor}`}>
                          <role.Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{role.role}</p>
                          <p className="text-xs text-slate-500 mt-0.5">{role.users} {role.users === 1 ? 'user' : 'users'}</p>
                        </div>
                      </div>
                    </td>
                    {role.permissions.map((hasPermission, idx) => (
                      <td key={idx} className="px-4 py-4 text-center">
                        {hasPermission ? (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-500">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : (
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                            <Minus className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
