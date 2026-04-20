import React from 'react';
import { Edit2 } from 'lucide-react';

const ToggleSwitch = ({ enabled }: { enabled: boolean }) => (
  <div className={`w-9 h-5 flex items-center rounded-full p-1 cursor-pointer transition-colors ${enabled ? 'bg-blue-600' : 'bg-gray-200'}`}>
    <div className={`bg-white w-3 h-3 rounded-full shadow-sm transform transition-transform ${enabled ? 'translate-x-4' : ''}`} />
  </div>
);

export default function PermissionsTab() {
  const permissions = [
    { feature: 'Webinars', enabled: true, used: '14', barWidth: '80%', total: '4' },
    { feature: 'Cohorts', enabled: true, used: '5', barWidth: '50%', total: '5' },
    { feature: '1:1 Mentorship', enabled: false, used: '-', barWidth: '0%', total: '-' },
    { feature: 'Cert. Practice Courses', enabled: true, used: 'Unlimited', barWidth: '100%', total: '12' },
    { feature: 'Assignments', enabled: true, used: '10', barWidth: '60%', total: '10' },
    { feature: 'Research Modules', enabled: false, used: '-', barWidth: '0%', total: '-' },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 w-full max-w-[1000px]">
      <h3 className="text-base font-bold text-[#0A0A0A] mb-6">Feature Access</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="py-4 px-2 text-[13px] font-semibold text-gray-500 w-[30%]">Feature</th>
              <th className="py-4 px-2 text-[13px] font-semibold text-gray-500 w-[15%]">Enabled</th>
              <th className="py-4 px-2 text-[13px] font-semibold text-gray-500 w-[15%]">Current Used</th>
              <th className="py-4 px-2 text-[13px] font-semibold text-gray-500 w-[30%]">Total</th>
              <th className="py-4 px-2 text-[13px] font-semibold text-gray-500 w-[10%] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {permissions.map((perm, idx) => (
              <tr key={idx} className="group">
                <td className="py-4 px-2 text-sm font-semibold text-[#0A0A0A]">
                  {perm.feature}
                </td>
                <td className="py-4 px-2">
                  <ToggleSwitch enabled={perm.enabled} />
                </td>
                <td className="py-4 px-2 text-sm text-gray-600 font-medium">
                  {perm.used}
                </td>
                <td className="py-4 px-2">
                  {perm.total !== '-' ? (
                    <div className="flex items-center gap-4">
                      <div className="w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: perm.barWidth }}></div>
                      </div>
                      <span className="text-sm text-gray-600 font-medium">{perm.total}</span>
                    </div>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="py-4 px-2 text-right">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-md hover:bg-gray-100 transition-colors">
                    <Edit2 className="w-4 h-4" />
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
