"use client";

import useSession from "@/hooks/useSession";
import { 
  Bell, 
  Menu, 
  Search, 
  ChevronDown, 
  User, 
  Mail, 
  Phone, 
  Edit2, 
  FastForward, 
  CreditCard, 
  Globe,
  Video,
  FileText,
  Calendar,
  Award,
  CheckCircle2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DashNavbarProps {
  role: string | null;
  onMenuClick: () => void;
  onChatToggle: () => void;
  isChatActive: boolean;
  onNotificationToggle: () => void;
  isNotificationActive: boolean;
}

// Mock Data for Notifications
const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    icon: Video,
    title: "Your session with Dr. Rao starts in 30 minutes",
    subtitle: "Webinar: Major Insights on Human Nervous System",
    time: "30m ago",
    unread: true,
  },
  {
    id: 2,
    icon: FileText,
    title: "Assignment feedback has been added by Dr. Nikhil",
    subtitle: "Obstetric Case- Third Trimester Bleeding",
    time: "2h ago",
    unread: true,
  },
  {
    id: 3,
    icon: Calendar,
    title: "A new mentorship session is available",
    subtitle: "1:1 Mentorship with Dr. Nikhitha Vimal",
    time: "5h ago",
    unread: true,
  },
  {
    id: 4,
    icon: Award,
    title: "Your certificate is ready to download",
    subtitle: "Data Science Fundamentals Course Completion",
    time: "1d ago",
    unread: false,
  }
];

export default function DashNavbar({
  onMenuClick,
  onNotificationToggle,
}: DashNavbarProps) {
  const { user } = useSession();
  
  // Profile State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"personal" | "payment">("personal");
  const [isEditing, setIsEditing] = useState(false);
  
  // Notification State
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const unreadCount = notifications.filter(n => n.unread).length;
  
  // Form States
  const [autoPayout, setAutoPayout] = useState(true);
  const [notifyPayments, setNotifyPayments] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Natalia Sam",
    email: "natalia@gmail.com",
    phone: "9834122562"
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "9978 1128 1558 1978",
    cardHolder: "Natalia Sam",
    country: "United Kingdom"
  });

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
        setIsEditing(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <nav className="bg-white border-b border-gray-100 h-20 fixed w-full top-0 z-40 lg:pl-64 transition-all duration-300">
      <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* --- LEFT: SEARCH & MENU --- */}
        <div className="flex items-center flex-1 max-w-md gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-400 hover:bg-gray-50 rounded-md"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          {/* <div className="relative w-full group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search research, files, sessions..."
              className="block w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div> */}
        </div>

        {/* --- RIGHT: NOTIFICATIONS & PROFILE --- */}
        <div className="flex items-center gap-2 sm:gap-6 relative">
          
          {/* Notifications Dropdown Container */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsProfileOpen(false);
                onNotificationToggle();
              }}
              className={`p-2 rounded-xl border transition-colors relative ${
                isNotifOpen ? 'bg-gray-50 border-gray-200 text-gray-700' : 'text-gray-500 hover:bg-gray-50 border-gray-100'
              }`}
            >
              <Bell className="h-5 w-5" strokeWidth={1.5} />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#042BFD] rounded-full border border-white"></span>
              )}
            </button>

            {/* Notifications Modal */}
            {isNotifOpen && (
              <div className="absolute top-[calc(100%+12px)] right-0 w-[380px] sm:w-[420px] bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 z-50 overflow-hidden cursor-default animate-in fade-in slide-in-from-top-2 duration-200">
                
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5">
                    <h2 className="text-[16px] font-bold text-gray-900">Notifications</h2>
                    {unreadCount > 0 && (
                      <span className="bg-[#E0E7FF] text-[#4F39F6] text-[11px] font-bold px-2 py-0.5 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-[12px] font-semibold text-[#042BFD] hover:text-blue-800 transition-colors"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                {/* Modal Body */}
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar pb-2">
                  {notifications.length > 0 ? (
                    <div className="flex flex-col">
                      {notifications.map((notif) => (
                        <div key={notif.id} className="flex items-start gap-4 p-3 hover:bg-gray-50/80 transition-colors border-b border-gray-50 cursor-pointer">
                          
                          {/* Icon */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${notif.unread ? 'bg-[#E0E7FF] text-[#4F39F6]' : 'bg-[#F8FAFC] text-gray-500'}`}>
                            <notif.icon size={16} strokeWidth={1.5} />
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 min-w-0 pr-2">
                            <h4 className={`text-[13px] mb-1 leading-snug ${notif.unread ? 'font-bold text-gray-900' : 'font-medium text-gray-700'}`}>
                              {notif.title}
                            </h4>
                            <p className="text-[12px] text-gray-500 mb-2 truncate">
                              {notif.subtitle}
                            </p>
                            <p className="text-[11px] text-gray-400 font-medium">
                              {notif.time}
                            </p>
                          </div>
                          
                          {/* Unread Dot */}
                          <div className="w-2 pt-1.5 shrink-0 flex justify-center">
                            {notif.unread && <div className="w-[7px] h-[7px] bg-[#042BFD] rounded-full"></div>}
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    /* Empty State */
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-[#EBF0FF] text-[#042BFD] flex items-center justify-center mb-5">
                        <CheckCircle2 size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-[15px] font-bold text-gray-900 mb-1.5">
                        You're all caught up 🎉
                      </h3>
                      <p className="text-[13px] text-gray-500">
                        We'll notify you when something new happens.
                      </p>
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>

          <div className="h-8 w-[1px] bg-gray-200 mx-1 hidden sm:block"></div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={profileRef}>
            <div 
              className="flex items-center gap-2.5 group cursor-pointer select-none"
              onClick={() => {
                setIsProfileOpen(!isProfileOpen);
                setIsNotifOpen(false);
              }}
            >
              <div 
                className="h-9 w-9 rounded-full bg-cover bg-center border border-gray-100"
                style={{ 
                  backgroundImage: `url(${`https://ui-avatars.com/api/?name=${user?.name || 'Natalia+Sam'}&background=random`})` 
                }}
              />
              <div className="hidden md:block text-left">
                <p className="text-[13px] font-semibold text-gray-900 leading-none">
                  {user?.name || "Natalia Sam"}
                </p>
                <p className="text-[11px] text-gray-400 mt-1">
                  {user?.email || "natt@gmail.com"}
                </p>
              </div>
              <ChevronDown className={`h-4 w-4 text-gray-400 ml-0.5 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Profile Modal */}
            {isProfileOpen && (
              <div className="absolute top-[calc(100%+12px)] right-0 w-[360px] bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-gray-100 p-5 z-50 cursor-default cursor-auto animate-in fade-in slide-in-from-top-2 duration-200">
                
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-[48px] w-[48px] rounded-full bg-cover bg-center border border-gray-100 shrink-0"
                      style={{ backgroundImage: `url(https://ui-avatars.com/api/?name=${user?.name || 'Natalia+Sam'}&background=random)` }}
                    />
                    <h2 className="text-[18px] font-bold text-gray-900">
                      {user?.name || "Natalia Sam"}
                    </h2>
                  </div>
                  
                  <div>
                    {!isEditing ? (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-[13px] font-medium transition-colors"
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="px-3 py-1.5 bg-white border border-[#042BFD] text-[#042BFD] rounded-lg hover:bg-blue-50 text-[13px] font-medium transition-colors"
                        >
                          Cancel
                        </button>
                        <button 
                          onClick={() => setIsEditing(false)}
                          className="px-3 py-1.5 bg-[#042BFD] text-white rounded-lg hover:bg-blue-700 text-[13px] font-medium transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex border-b border-gray-200 mb-5 relative">
                  <button
                    onClick={() => { setActiveTab("personal"); setIsEditing(false); }}
                    className={`pb-2.5 px-1 text-[13px] font-medium transition-colors relative ${
                      activeTab === "personal" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Personal Info
                    {activeTab === "personal" && (
                      <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#042BFD]" />
                    )}
                  </button>
                  <button
                    onClick={() => { setActiveTab("payment"); setIsEditing(false); }}
                    className={`pb-2.5 px-5 text-[13px] font-medium transition-colors relative ${
                      activeTab === "payment" ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    Payment Info
                    {activeTab === "payment" && (
                      <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#042BFD]" />
                    )}
                  </button>
                </div>

                <div className="overflow-hidden">
                  {activeTab === "personal" ? (
                    <div className="border border-gray-200 rounded-xl p-1.5 bg-white">
                      <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                          <User size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] text-gray-400 mb-0.5">Full Name</p>
                          {isEditing ? (
                            <input 
                              type="text" 
                              value={formData.fullName}
                              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                              className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
                            />
                          ) : (
                            <p className="text-[14px] font-medium text-gray-900">{formData.fullName}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                        <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                          <Mail size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] text-gray-400 mb-0.5">Email</p>
                          {isEditing ? (
                            <input 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
                            />
                          ) : (
                            <p className="text-[14px] font-medium text-gray-900">{formData.email}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3">
                        <div className="w-10 h-10 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                          <Phone size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                        </div>
                        <div className="flex-1">
                          <p className="text-[12px] text-gray-400 mb-0.5">Phone Number</p>
                          {isEditing ? (
                            <input 
                              type="tel" 
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full text-[14px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-1 bg-transparent"
                            />
                          ) : (
                            <p className="text-[14px] font-medium text-gray-900">{formData.phone}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <div>
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">PREFERENCE</h3>
                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden">
                          
                          <div className="flex items-center justify-between p-3 border-b border-gray-100">
                            <div className="flex items-center gap-3 pr-4">
                              <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                                <FastForward size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                              </div>
                              <div>
                                <p className="text-[13px] font-medium text-gray-900">Enable Auto Payout</p>
                                <p className="text-[11px] text-gray-500">Autopayout occurs at the end of each month.</p>
                              </div>
                            </div>
                            
                            {isEditing ? (
                              <div 
                                onClick={() => setAutoPayout(!autoPayout)}
                                className={`w-10 h-[22px] rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${autoPayout ? 'bg-[#042BFD]' : 'bg-gray-200'}`}
                              >
                                <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${autoPayout ? 'translate-x-[18px]' : 'translate-x-0'}`} />
                              </div>
                            ) : (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center shrink-0 ${
                                autoPayout ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F1F5F9] text-[#64748B]'
                              }`}>
                                {autoPayout ? 'ON' : 'OFF'}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between p-3">
                            <div className="flex items-center gap-3 pr-4">
                              <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                                <Bell size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                              </div>
                              <div>
                                <p className="text-[13px] font-medium text-gray-900">Notify New Payments</p>
                                <p className="text-[11px] text-gray-500">You will be notified when a payment has been made.</p>
                              </div>
                            </div>
                            
                            {isEditing ? (
                              <div 
                                onClick={() => setNotifyPayments(!notifyPayments)}
                                className={`w-10 h-[22px] rounded-full p-0.5 transition-colors duration-200 ease-in-out shrink-0 cursor-pointer ${notifyPayments ? 'bg-[#042BFD]' : 'bg-gray-200'}`}
                              >
                                <div className={`w-[18px] h-[18px] bg-white rounded-full shadow-sm transform transition-transform duration-200 ease-in-out ${notifyPayments ? 'translate-x-[18px]' : 'translate-x-0'}`} />
                              </div>
                            ) : (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded flex items-center shrink-0 ${
                                notifyPayments ? 'bg-[#ECFDF5] text-[#059669]' : 'bg-[#F1F5F9] text-[#64748B]'
                              }`}>
                                {notifyPayments ? 'ON' : 'OFF'}
                              </span>
                            )}
                          </div>

                        </div>
                      </div>

                      <div>
                        <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">CARD DETAILS</h3>
                        <div className="border border-gray-200 rounded-xl bg-white overflow-hidden p-1.5">
                          
                          <div className="flex items-center gap-3 p-2.5 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                              <CreditCard size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] text-gray-400 mb-0.5">Credit Card</p>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  value={paymentData.cardNumber}
                                  onChange={(e) => setPaymentData({...paymentData, cardNumber: e.target.value})}
                                  className="w-full text-[13px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-0.5 bg-transparent"
                                />
                              ) : (
                                <p className="text-[13px] font-medium text-gray-900">{paymentData.cardNumber}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-2.5 border-b border-gray-100">
                            <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                              <User size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] text-gray-400 mb-0.5">Card Holder</p>
                              {isEditing ? (
                                <input 
                                  type="text" 
                                  value={paymentData.cardHolder}
                                  onChange={(e) => setPaymentData({...paymentData, cardHolder: e.target.value})}
                                  className="w-full text-[13px] font-medium text-gray-900 border-b border-gray-300 focus:border-[#042BFD] outline-none pb-0.5 bg-transparent"
                                />
                              ) : (
                                <p className="text-[13px] font-medium text-gray-900">{paymentData.cardHolder}</p>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center gap-3 p-2.5">
                            <div className="w-9 h-9 rounded-xl bg-[#F8F9FA] flex items-center justify-center shrink-0">
                              <Globe size={18} className="text-[#042BFD]" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1">
                              <p className="text-[11px] text-gray-400 mb-0.5">Country</p>
                              {isEditing ? (
                                <div className="flex items-center gap-1.5 border-b border-gray-300 focus-within:border-[#042BFD] pb-0.5">
                                  <span>🇬🇧</span>
                                  <input 
                                    type="text" 
                                    value={paymentData.country}
                                    onChange={(e) => setPaymentData({...paymentData, country: e.target.value})}
                                    className="w-full text-[13px] font-medium text-gray-900 outline-none bg-transparent"
                                  />
                                </div>
                              ) : (
                                <p className="text-[13px] font-medium text-gray-900 flex items-center gap-1.5">
                                  <span>🇬🇧</span> {paymentData.country}
                                </p>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </nav>
  );
}