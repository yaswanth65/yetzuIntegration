"use client";

import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="relative w-full bg-[#F9F9F9] pt-12">
      {/* Footer */}
      <footer className="relative rounded-2xl shadow-sm max-w-7xl px-24 py-12 mx-24 bg-gradient-to-r from-white to-[#1F1E82]/[0.16]">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          {/* Left Section */}
          <div className="flex-1">
            <img src="Images/Logo.png" alt="YETZU Logo" className="h-8 mb-4" />
            <p className="text-gray-600 max-w-sm leading-relaxed">
              Lorem ipsym, can be used for free any where for anything. Ir is
              effective tool so solve our text relate problems. can be
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <p className="font-semibold text-gray-800 mb-2">
                Subscribe to Newsletter
              </p>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="email"
                  placeholder="Enter Input"
                  className="px-3 py-2 rounded-md border border-gray-300 bg-gray-100 focus:outline-none w-60"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                  Subscribe now
                </button>
              </div>
            </div>
          </div>
          {/* Right Menu Columns */}
          <div className="flex flex-wrap justify-between flex-1">
            {[1, 2, 3].map((col) => (
              <div key={col} className="min-w-[120px]">
                <h4 className="font-semibold text-gray-800 mb-3">Title</h4>
                {Array(7)
                  .fill("Menu")
                  .map((menu, i) => (
                    <p
                      key={i}
                      className="text-gray-600 hover:text-gray-800 cursor-pointer mb-1"
                    >
                      {menu}
                    </p>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-end lg:justify-end gap-6 pt-6">
          <FaInstagram className="text-gray-700 hover:text-pink-600 text-lg cursor-pointer" />
          <FaFacebookF className="text-gray-700 hover:text-blue-600 text-lg cursor-pointer" />
          <FaYoutube className="text-gray-700 hover:text-red-600 text-lg cursor-pointer" />
        </div>
      </footer>

      {/* Watermark Image */}
      <div className="w-full flex justify-center items-center bg-transparent -mt-4">
        <img
          src="Images/Footer Last Logo.png"
          alt="YETZU Watermark"
          className="w-full h-auto opacity-20 select-none pointer-events-none object-cover px-28 mt-12"
        />
      </div>
    </div>

  );
}
