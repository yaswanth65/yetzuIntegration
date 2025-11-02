"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import useSession from "@/hooks/useSession";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { user, logout } = useSession();

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
    setIsLoading(false);
  };

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-4">
        Welcome, {user?.name || "User"}
      </h1>

      {user ? (
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className={`px-4 py-2 text-white rounded-md font-medium transition ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
            }`}
        >
          {isLoading ? "Logging out..." : "Logout"}
        </button>
      ) : (
        <button
          onClick={handleLoginRedirect}
          className="px-4 py-2 text-white rounded-md font-medium transition bg-blue-600 hover:bg-blue-700"
        >
          Login
        </button>
      )}
    </main>
  );
}
