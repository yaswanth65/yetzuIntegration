import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

type StudentsTabProps = {
  students?: any[];
};

const getInitials = (name: string) => {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
};

const getInitialsColor = (index: number) => {
  const colors = ['bg-blue-100 text-blue-600', 'bg-purple-100 text-purple-600', 'bg-green-100 text-green-600', 'bg-orange-100 text-orange-600', 'bg-teal-100 text-teal-600'];
  return colors[index % colors.length];
};

export default function StudentsTab({ students }: StudentsTabProps) {
  const studentList = (students && students.length > 0) ? students : [];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header bar / Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search students..."
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="py-3 px-4 text-xs font-semibold text-gray-500">Name</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500">Email</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500">Status</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500">Assigned Access</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500 text-center">Sessions Joined</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500">Progress</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500 text-center">Certificates</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
              {studentList.map((student: any, idx: number) => {
                const name = student.name || student.Name || 'Student';
                const email = student.email || student.Email || '';
                const status = student.status || student.Status || 'Active';
                const progress = Number(student.progress || student.Progress || student.completionRate || 0);
                const sessions = Number(student.sessionsJoined || student.sessions || student.SessionsJoined || 0);
                const certs = Number(student.certificates || student.certs || 0);
                const access = student.assignedAccess || student.access || student.Access || '—';
                const accessDisplay = Array.isArray(access) ? access.join(', ') : access;

                return (
                <tr key={student.id || idx} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getInitialsColor(idx)}`}>
                        {getInitials(name)}
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {email}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                      status === 'Active' || status === 'active'
                        ? 'text-green-600'
                        : 'text-red-500'
                    }`}>
                      {status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {accessDisplay}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium text-center">
                    {sessions}
                  </td>
                  <td className="py-3 px-4 w-48">
                    <div className="flex items-center gap-3">
                      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: `${progress}%` }}></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-500 w-8">{progress}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium text-center">
                    {certs}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
