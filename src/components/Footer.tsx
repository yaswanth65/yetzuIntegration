"use client";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="relative w-full   flex flex-col items-center">
      <footer className="relative rounded-[28px] shadow-sm w-full max-w-7xl px-12 py-12 bg-gradient-to-l from-[#E6EAFF] to-[#FFFFFF] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex-1">
            <img src="Images/Logo.png" alt="YETZU Logo" className="h-8 mb-4" />
            <p className="text-[#252525] text-[18px] font-[400] leading-[100%] tracking-[-0.03em] font-[SF Pro] max-w-sm">
              Lorem ipsym, can be used for free any where for anything. Ir is
              effective tool so solve our text relate problems. can be
            </p>

            <div className="mt-8">
              <p className="text-[#404040] text-[26px] font-[Inter] font-[600] leading-[100%] tracking-[-0.05em] mb-3">
                Subscribe to Newsletter
              </p>
              <div className="flex gap-2 flex-wrap">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="px-3 py-2 rounded-md border border-gray-300 bg-[#E4E4E4] text-[#5C5C5C] placeholder-[#5C5C5C] text-[14px] font-[SF Pro] font-[400] leading-[100%] tracking-[0%] focus:outline-none w-60"
                />
                <button className="bg-[#042BFD] text-white text-[18px] font-[SF Pro] font-[400] tracking-[-0.03em] px-4 py-2 rounded-md hover:bg-blue-700 transition-all">
                  Subscribe now
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-between flex-1">
            {[1, 2, 3].map((col) => (
              <div key={col} className="min-w-[120px] text-right">
                <h4 className="text-[#252525] text-[22px] font-[Inter] font-[600] tracking-[-0.06em] mb-3">
                  Title
                </h4>
                <div className="flex flex-col gap-[12px]">
                  {Array(7)
                    .fill("Menu")
                    .map((menu, i) => (
                      <p
                        key={i}
                        className="text-[#252525] text-[18px] font-[SF Pro] font-[400] tracking-[-0.03em] cursor-pointer hover:text-[#042BFD]"
                      >
                        {menu}
                      </p>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-6 pt-6">
          <FaInstagram className="text-[#252525] hover:text-pink-600 text-lg cursor-pointer" />
          <FaFacebookF className="text-[#252525] hover:text-blue-600 text-lg cursor-pointer" />
          <FaYoutube className="text-[#252525] hover:text-red-600 text-lg cursor-pointer" />
        </div>
      </footer>

      <div className="w-full flex justify-center items-center bg-transparent mt-[100px]">
        <img
          src="Images/Footer Last Logo.png"
          alt="YETZU Watermark"
          className="w-[90%] max-w-6xl h-auto opacity-20 select-none pointer-events-none object-cover"
        />
      </div>
    </div>
  );
}
