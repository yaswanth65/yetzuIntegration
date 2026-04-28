import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu, LogOut, Loader2, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { identityService } from "@/lib/queries/identityService/identityService";

interface EducatorHeaderProps {
  onMenuClick: () => void;
}

interface UserProfile {
  name?: string;
  email?: string;
  profileImage?: string;
  avatar?: string;
}

export default function Header({ onMenuClick }: EducatorHeaderProps) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await identityService.getUserProfile();
        const userData = response?.user || response?.data || response;
        setUser({
          name: userData?.name || userData?.Name || "Educator",
          email: userData?.email || userData?.Email || "",
          profileImage: userData?.profileImage || userData?.avatar || "",
        });
      } catch {
        const cookieName = Cookies.get("userName");
        if (cookieName) {
          setUser({ name: cookieName, email: "" });
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const userId = Cookies.get("userId");
      if (userId) {
        await identityService.logout(userId);
      }
    } catch {
    } finally {
      // Clear all auth cookies
      Cookies.remove("jwtToken");
      Cookies.remove("refreshToken");
      Cookies.remove("userId");
      Cookies.remove("userName");
      router.push("/");
    }
  };

  const userInitials = user?.name ? user.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() : "E";
  const userImage = user?.profileImage || user?.avatar;

  return (
    <div className="w-full border-b border-gray-100 flex items-center justify-between p-4 px-4 md:px-8 bg-white z-40 relative">
      <div>
        <Image width={110} height={32} src="/logo-Yetzu.svg" alt="logo" className="w-[100px] md:w-[120px]" />
      </div>
      
      <div className="flex items-center gap-3 md:gap-6">
        <button className="hidden sm:flex p-2 text-gray-400 hover:bg-gray-50 rounded-xl transition-all">
          <Image width={20} height={20} src="/admin-dashboard/ad-bell-icon.svg" alt="bell-icon" />
        </button>
        
        <span className="hidden sm:inline-block w-px h-6 bg-gray-200"></span>

        {loading ? (
          <div className="hidden md:flex items-center gap-4">
            <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-4 relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 px-2 rounded-xl transition-all"
            >
              <div className="flex flex-col items-end">
                <h1 className="text-sm font-bold text-gray-900">{user?.name || "Educator"}</h1>
                {user?.email && <p className="text-[10px] text-gray-400 font-medium">{user.email}</p>}
              </div>
              {userImage ? (
                <Image
                  width={36}
                  height={36}
                  src={userImage}
                  alt={user?.name || "User"}
                  className="rounded-lg shadow-sm object-cover"
                />
              ) : (
                <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                  {userInitials}
                </div>
              )}
              <ChevronDown size={14} className="text-gray-400" />
            </button>

            {showDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDropdown(false)} />
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20">
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-xl active:bg-gray-200 transition-all"
        >
          <Menu size={24} />
        </button>
      </div>
    </div>
  );
}
