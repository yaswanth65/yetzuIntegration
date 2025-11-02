"use client"

import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import useSession from "@/hooks/useSession";

const Navbar = () => {
  const { user: { name } } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto flex justify-between items-center px-6 md:px-10 lg:px-16 py-4">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/images/Logo.png"
              alt="Yetzu Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8 text-gray-800">
          <Link href="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>

          <Link href="/about" className="hover:text-blue-600 font-medium">
            About Us
          </Link>

          <div className="relative group">
            <button
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
              className="flex items-center gap-1 hover:text-blue-600 font-medium"
            >
              Courses
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isCoursesOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            {isCoursesOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-lg py-2">
                <Link href="/courses/medical" className="block px-4 py-2 hover:bg-blue-50 text-gray-700">
                  Medical
                </Link>
                <Link href="/courses/engineering" className="block px-4 py-2 hover:bg-blue-50 text-gray-700">
                  Engineering
                </Link>
                <Link href="/courses/commerce" className="block px-4 py-2 hover:bg-blue-50 text-gray-700">
                  Commerce
                </Link>
              </div>
            )}
          </div>

          <Link href="/contact" className="hover:text-blue-600 font-medium">
            Contact Us
          </Link>
        </div>

        <div className="hidden md:block">
          {!name &&
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition font-medium">
              Log In
            </Link>
          }
          <p>{name}</p>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
