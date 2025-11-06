"use client";

import Link from "next/link";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

const footerLinks = [
  {
    title: "Menu",
    links: [
      { label: "Home", route: "/" },
      { label: "About", route: "/about" },
      { label: "Programs", route: "/programs" },
      { label: "Resources", route: "/resources" },
      { label: "Assignments", route: "/assignments" },
      { label: "Contact", route: "/contact" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "Privacy Policy", route: "/legal/privacy-policy" },
      { label: "Terms and Conditions", route: "/legal/terms" },
      { label: "Refund Policy", route: "/legal/refund-policy" },
      { label: "Mentorship Policy", route: "/legal/mentorship-policy" },
      { label: "Code of Conduct", route: "/legal/code-of-conduct" },
    ],
  },
  {
    title: "Title",
    links: [
      { label: "Menu", route: "/" },
      { label: "Menu", route: "/" },
      { label: "Menu", route: "/" },
      { label: "Menu", route: "/" }
    ],
  },
];

export default function Footer() {
  return (
    <div className="relative w-full   flex flex-col items-center">
      <footer className="relative rounded-[28px] shadow-sm w-full max-w-7xl px-12 py-12 bg-gradient-to-l from-[#E6EAFF] to-[#FFFFFF] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex-1">
            <img src="Images/Logo.png" alt="YETZU Logo" className="h-8 mb-4" />
            <p className="text-gray-600 max-w-sm leading-relaxed">
              Lorem ipsym, can be used for free any where for anything. Ir is
              effective tool so solve our text relate problems. can be
            </p>

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

          <div className="flex flex-wrap justify-between flex-1">
            {footerLinks.map((section, index) => (
              <div key={index} className="min-w-[120px]">
                <h4 className="font-semibold text-gray-800 mb-3">{section.title}</h4>
                {section.links.map((link, i) => (
                  <Link
                    key={i}
                    href={link.route}
                    className="block text-gray-600 hover:text-gray-900 cursor-pointer mb-1 transition"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </footer>

      <div className="w-full flex justify-center items-center bg-transparent mt-[100px]">
        <img
          src="Images/Footer Last Logo.png"
          alt="YETZU Watermark"
          className="w-full h-auto opacity-20 select-none pointer-events-none object-cover px-28 mt-12"
        />
      </div>
    </div>

  );
}
