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
    title: "Sessions",
    links: [
      { label: "Webinars", route: "/courses?category=Webinars" },
      { label: "1:1", route: "/courses?category=1:1" },
      { label: "Cohort", route: "/courses?category=Cohort" },
      { label: "Certification Courses", route: "/courses?category=Certification Courses" },
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
];

const socialIcons = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <div className="relative w-full flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
      <footer className="relative w-full max-w-[1224px] mx-auto p-6 sm:p-[32px_42px_40px] bg-gradient-to-l from-[#E6EAFF] to-[#FFFFFF] shadow-[0_16px_40px_-8px_rgba(31,30,130,0.16)] rounded-[28px]">
        <div className="flex flex-col gap-6 lg:gap-8">
          {/* Top Section: Logo/Desc and Links */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-6 lg:gap-[143px]">
            {/* Logo + Description */}
            <div className="flex flex-col items-start gap-[14px] w-full max-w-[409px]">
              <img
                src="/logo-Yetzu.svg"
                alt="YETZU Logo"
                className="w-[209px] h-auto"
              />
              <p className="text-[#404040] text-sm font-light leading-[20px] tracking-[-0.03em]">
                Loren ipsym , can be used for free any where for anything. Ir is
                effectove tool so solve our text relate problems. can be
              </p>
            </div>

            {/* Links Row */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 w-full lg:w-[561px]">
              {footerLinks.map((section, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-2"
                >
                  <h4 className="text-[#404040] text-[20px] font-semibold leading-[27px] tracking-[-0.06em] w-full text-left">
                    {section.title}
                  </h4>
                  <div className="flex flex-col items-start gap-2 w-full">
                    {section.links.map((link, i) => (
                      <Link
                        key={i}
                        href={link.route}
                        className="block text-[#404040] hover:text-gray-900 w-full text-left text-[14px] leading-[21px] tracking-[-0.03em] transition"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section: Subscribe  Social Icons */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 w-full pt-6 border-t border-gray-200/50">
            {/* Subscribe */}
            <div className="flex flex-col items-start gap-3 w-full max-w-[497px]">
              <h3 className="text-[#404040] text-[22px] font-medium leading-[27px] tracking-[-0.05em]">
                Subscribe to Newsletter
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-[21px] w-full">
                <input
                  type="email"
                  placeholder="Enter Input"
                  className="w-full sm:w-[289px] h-11 px-3 py-3 bg-[#E4E4E4] border border-[#E4E4E4] rounded-lg text-sm text-[#5C5C5C] placeholder-[#5C5C5C] focus:outline-none"
                />
                <button className="w-full sm:w-[187px] h-11 bg-[#042BFD] shadow-[0_2px_4px_rgba(31,30,130,0.04)] rounded-lg text-white text-lg leading-[21px] tracking-[-0.03em] hover:bg-blue-700 transition">
                  Subscribe now
                </button>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex flex-row items-center gap-[42px] pb-1">
              {socialIcons.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-[#404040] hover:text-gray-900 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </footer>

      <div className="w-full flex justify-center items-center bg-transparent mt-[100px]">
        <img
          src="/images/Footer Last Logo.png"
          alt="YETZU Watermark"
          className="w-full h-auto opacity-20 select-none pointer-events-none object-cover px-4 sm:px-12 md:px-28 mt-12"
        />
      </div>
    </div>
  );
}