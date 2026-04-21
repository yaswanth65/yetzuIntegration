import React from 'react';
import { Session } from '../types';
import { Eye, Users } from 'lucide-react';

interface SessionsListProps {
  sessions: Session[];
}

export default function SessionsList({ sessions }: SessionsListProps) {
  return (
    <div className="bg-white rounded-[20px] shadow-sm overflow-hidden border border-gray-100 p-2 md:p-6 mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-sm text-gray-500 border-b border-gray-100">
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Session ID</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Session Title</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Type</th>
              <th className="font-semibold py-4 px-4 text-center whitespace-nowrap">
                <Users size={16} className="mx-auto" />
              </th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Date</th>
              <th className="font-semibold py-4 px-4 whitespace-nowrap">Status</th>
              <th className="font-semibold py-4 px-4 text-center whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-500">
                  No sessions found
                </td>
              </tr>
            ) : (
              sessions.map((session, index) => (
                <tr
                  key={session.id}
                  className={`border-b border-gray-50 text-sm hover:bg-gray-50 transition-colors ${
                    index === sessions.length - 1 ? 'border-none' : ''
                  }`}
                >
                  <td className="py-4 px-4 font-medium text-gray-900 whitespace-nowrap">{session.id}</td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{session.title}</td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{session.type}</td>
                  <td className="py-4 px-4 text-center text-gray-600 whitespace-nowrap">{session.attendees}</td>
                  <td className="py-4 px-4 text-gray-600 whitespace-nowrap">{session.date}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {session.status === 'Live' && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                          <span className="text-green-600 font-medium">{session.status}</span>
                        </>
                      )}
                      {session.status === 'Scheduled' && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                          <span className="text-blue-600 font-medium">{session.status}</span>
                        </>
                      )}
                      {session.status === 'Completed' && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-500"></div>
                          <span className="text-gray-600 font-medium">{session.status}</span>
                        </>
                      )}
                      {session.status === 'Missed' && (
                        <>
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                          <span className="text-red-600 font-medium">{session.status}</span>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-4 min-w-[120px]">
                      <button className="text-gray-400 hover:text-gray-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      {session.status === 'Live' && (
                        <button className="border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 font-medium py-1.5 px-4 rounded-xl text-sm transition-colors shadow-sm">
                          Join Now
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-6 text-sm text-gray-500">
        <span>
          Showing 1 - {sessions.length} of {sessions.length}
        </span>
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
            {'<'}
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-medium transition-colors">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:bg-gray-100 transition-colors">
            {'>'}
          </button>
        </div>
      </div>
    </div>
  );
}
