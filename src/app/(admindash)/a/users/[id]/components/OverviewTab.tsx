import React from "react";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  GraduationCap, 
  Building2,
  Clock,
  Briefcase
} from "lucide-react";

interface OverviewTabProps {
  user: any;
}

const InfoCard = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm flex flex-col gap-5">
    <h3 className="text-base font-bold text-[#021165] tracking-tight">{title}</h3>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const InfoItem = ({ icon: Icon, label, value, valueColor = "text-slate-900" }: { icon: any, label: string, value: string, valueColor?: string }) => (
  <div className="flex items-start gap-3">
    <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-slate-400" />
    </div>
    <div className="flex flex-col">
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1.5">{label}</span>
      <span className={`text-sm font-bold ${valueColor} leading-tight`}>{value}</span>
    </div>
  </div>
);

const StatCard = ({ label, value, icon: Icon, colorClass }: { label: string, value: string | number, icon: any, colorClass: string }) => (
  <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
    <div className="flex items-center justify-between mb-4">
      <div className={`w-10 h-10 rounded-xl ${colorClass} bg-opacity-10 flex items-center justify-center`}>
        <Icon className={`w-5 h-5 ${colorClass.replace('bg-', 'text-')}`} />
      </div>
      <span className="text-2xl font-black text-[#021165] tracking-tight">{value}</span>
    </div>
    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</div>
  </div>
);

export default function OverviewTab({ user }: OverviewTabProps) {
  const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : "N/A";

  const lastLogin = user.lastLogin ? new Date(user.lastLogin).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "N/A";
  const activities = Array.isArray(user.activities) ? user.activities : [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Columns - Info Cards */}
      <div className="lg:col-span-2 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard 
            label="Total Sessions" 
            value={user.sessionCount || 0} 
            icon={Clock} 
            colorClass="bg-blue-600" 
          />
          <StatCard 
            label="Assignments" 
            value={0} 
            icon={GraduationCap} 
            colorClass="bg-purple-600" 
          />
          <StatCard 
            label="Attendance" 
            value={`${user.attendanceRate ?? 0}%`} 
            icon={Calendar} 
            colorClass="bg-emerald-600" 
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Personal Details */}
          <InfoCard title="Personal Information">
            <InfoItem 
              icon={Mail} 
              label="Email Address" 
              value={user.email || "N/A"} 
              valueColor="text-blue-600"
            />
            <InfoItem 
              icon={Phone} 
              label="Phone Number" 
              value={user.mobileno || "N/A"} 
            />
            <InfoItem 
              icon={Calendar} 
              label="Date Joined" 
              value={joinedDate} 
            />
            <InfoItem 
              icon={Clock} 
              label="Last Login" 
              value={lastLogin} 
            />
          </InfoCard>

          {/* Organization Details */}
          <InfoCard title="Academic Context">
            <InfoItem 
              icon={Building2} 
              label="Organization" 
              value={user.organization?.name || "N/A"} 
            />
            <InfoItem 
              icon={Briefcase} 
              label="Organization Code" 
              value={user.organization?.code || "N/A"} 
            />
            <InfoItem 
              icon={GraduationCap} 
              label="Qualification" 
              value={user.qualification || "N/A"} 
            />
            <InfoItem 
              icon={MapPin} 
              label="Last Known IP" 
              value={user.lastIp || "N/A"} 
            />
          </InfoCard>
        </div>
      </div>

      {/* Right Column - Activity & More */}
      <div className="space-y-8">
        {/* Activity Feed */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <h3 className="text-base font-bold text-[#021165] tracking-tight mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {activities.length > 0 ? activities.map((activity: any, idx: number) => (
              <div key={activity.id || idx} className="flex gap-4 group">
                <div className="flex flex-col items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600 mt-1.5 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] group-hover:scale-125 transition-transform" />
                  {idx !== activities.length - 1 && <div className="w-px h-full bg-slate-100 my-1" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-700 leading-tight">{activity.title || activity.description || "N/A"}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{activity.activity_time || activity.created_at || "N/A"}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-500">No recent activity.</p>
            )}
          </div>
        </div>

        {/* Quick Actions / Notes */}
        <div className="bg-[#021165] rounded-2xl p-6 text-white shadow-xl shadow-blue-900/10">
          <h3 className="text-base font-bold mb-4 tracking-tight">Admin Notes</h3>
          <p className="text-sm text-blue-100/70 font-medium leading-relaxed mb-6">N/A</p>
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all border border-white/10">
            Add New Note
          </button>
        </div>
      </div>
    </div>
  );
}
