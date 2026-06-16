import React, { useEffect, useState } from "react";
import { 
  Calendar, 
  Clock, 
  Video, 
  Users, 
  ArrowRight,
  ExternalLink,
  Search
} from "lucide-react";
import { AdminAPI, asArray } from "@/lib/api";
import { shortenId } from "@/lib/utils/shortenId";

interface SessionsTabProps {
  user: any;
}

export default function SessionsTab({ user }: SessionsTabProps) {
  const [sessions, setSessions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchSessions = async () => {
      setIsLoading(true);
      try {
        const response = await AdminAPI.getSessions({ page: 1, limit: 100 });
        const allSessions = asArray(response?.data?.list || response?.data || response);
        
        // Filter sessions where student is enrolled
        const studentSessions = allSessions.filter((session: any) => 
          asArray(session.students).includes(user.id)
        );
        
        setSessions(studentSessions);
      } catch (error) {
        console.error("Failed to fetch sessions for student:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [user.id]);

  const filteredSessions = sessions.filter(s => 
    s.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.sessionCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-[#021165] tracking-tight">Enrolled Sessions</h3>
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search sessions..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {filteredSessions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold border border-blue-100">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#021165] group-hover:text-blue-600 transition-colors">
                      {session.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                      {session.sessionCode} • {session.sessionType}
                    </p>
                  </div>
                </div>
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                  session.status === 'Completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                }`}>
                  {session.status}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">
                    {session.scheduleDate ? new Date(session.scheduleDate).toLocaleDateString() : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">
                    {session.startTime} - {session.endTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">
                    {session.studentsCount || 0} Students
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Video className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600">
                    Online
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                    <Users className="w-3 h-3 text-slate-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Educator: {session.educator?.name || 'N/A'}
                  </span>
                </div>
                <button className="flex items-center gap-1.5 text-xs font-black text-blue-600 hover:gap-2 transition-all">
                  Session Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100 shadow-sm">
            <Video className="w-8 h-8 text-slate-300" />
          </div>
          <h4 className="text-sm font-bold text-slate-900 mb-1">No sessions found</h4>
          <p className="text-xs text-slate-500 font-medium">This student isn't enrolled in any active sessions.</p>
        </div>
      )}
    </div>
  );
}
