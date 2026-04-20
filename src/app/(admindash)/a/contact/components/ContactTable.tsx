import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';

interface ContactTableProps {
  onViewClick: (contactData: any) => void;
}

const mockData = [
  {
    id: 1,
    submittedDate: '9/4/2026, 9:13:39 pm',
    user: {
      name: 'Yaswanth Kancharla',
      email: 'yaswanth.kancharla65@gmail.com',
      phone: '9059540117',
      institution: 'VIT'
    },
    inquiry: 'Technical Support',
    message: 'hello i need fixing',
    status: 'Pending'
  },
  {
    id: 2,
    submittedDate: '9/2/2026, 5:21:00 pm',
    user: {
      name: 'Asha R',
      email: 'asha.research@email.com',
      phone: '9988776655',
      institution: 'IIT Madras'
    },
    inquiry: 'General Inquiry',
    message: 'Need pricing details for journal form...',
    status: 'Resolved'
  }
];

export default function ContactTable({ onViewClick }: ContactTableProps) {
  const [activeTab, setActiveTab] = useState('Contact');

  return (
    <div className="bg-white rounded-[20px] border border-gray-200 mt-8 w-full shadow-sm overflow-hidden p-6 pb-12">
      
      {/* Tabs */}
      <div className="flex mb-6">
        <div className="flex border border-gray-200 rounded-xl overflow-hidden bg-gray-50/50 p-1">
          <button 
            onClick={() => setActiveTab('Contact')}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'Contact' ? 'bg-white shadow-sm text-slate-800' : 'text-gray-500 hover:text-slate-700'
            }`}
          >
            Contact
          </button>
          <button 
            onClick={() => setActiveTab('Post Publication Support')}
            className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
              activeTab === 'Post Publication Support' ? 'bg-white shadow-sm text-slate-800' : 'text-gray-500 hover:text-slate-700'
            }`}
          >
            Post Publication Support
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-4 mb-6">
        <div className="relative w-full max-w-sm">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search name, email, phone..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none pr-8 relative bg-no-repeat" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em' }}>
            <option>All Status</option>
          </select>
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none pr-8 relative bg-no-repeat" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em' }}>
            <option>All Inquiry Types</option>
          </select>
          <select className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none pr-8 relative bg-no-repeat" style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundSize: '1em 1em' }}>
            <option>Newest First</option>
          </select>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto w-full rounded-2xl border border-gray-100 pb-2">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-[#FAFAFA] border-b border-gray-100">
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 capitalize w-[15%]">Submitted</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 capitalize w-[25%]">User</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 capitalize w-[15%]">Inquiry</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 capitalize w-[20%]">Message</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 capitalize w-[15%]">Status</th>
              <th className="py-4 px-6 text-[13px] font-bold text-gray-500 capitalize w-[10%] text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="py-5 px-6 text-sm text-slate-600 font-medium">
                  {item.submittedDate}
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-bold text-slate-800">{item.user.name}</span>
                    <span className="text-xs text-gray-500">{item.user.email}</span>
                    <span className="text-xs text-gray-500">{item.user.phone}</span>
                    <span className="text-xs text-gray-500">{item.user.institution}</span>
                  </div>
                </td>
                <td className="py-5 px-6 text-sm text-slate-700 font-medium">
                  {item.inquiry}
                </td>
                <td className="py-5 px-6 text-sm text-slate-600 truncate max-w-[200px]">
                  {item.message}
                </td>
                <td className="py-5 px-6">
                  <div className="flex flex-col gap-2 items-start">
                    <span className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider rounded-md border ${
                      item.status === 'Pending' ? 'bg-[#E0F2FE] text-[#0284C7] border-blue-200' : 'bg-[#DCFCE7] text-[#16A34A] border-green-200'
                    }`}>
                      {item.status.toUpperCase()}
                    </span>
                    <select 
                      className="px-2 py-1.5 bg-white border border-gray-200 rounded-md text-xs font-semibold text-slate-700 focus:outline-none appearance-none pr-6 relative"
                      defaultValue={item.status}
                      style={{ backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")', backgroundPosition: 'right 0.25rem center', backgroundSize: '1em 1em' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                </td>
                <td className="py-5 px-6 text-center">
                  <button 
                    onClick={() => onViewClick(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-blue-200 rounded-lg text-sm font-bold text-blue-600 hover:bg-blue-50 transition-colors mx-auto"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
