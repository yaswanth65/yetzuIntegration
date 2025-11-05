"use client";

import Image from "next/image";

export default function ProgramsWebinarsSection() {
  return (
    <div className="w-full bg-white px-4 sm:px-6 lg:px-[100px] py-[60px] flex flex-col items-center">
      {/* Header Section */}
      <div className="text-center mb-[52px]">
        <h2
          className="font-inter font-medium text-[46px] leading-[56px] tracking-[-0.06em] text-[#021165] mb-[16px]"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Programs & Webinars
        </h2>
        <p
          className="font-['SF_Pro'] text-[16px] leading-[19px] tracking-[-0.03em] text-[#252525] max-w-[670px] mx-auto"
          style={{ fontFamily: "var(--font-sfpro)" }}
        >
          Stay Ahead with Our Expert-Led Webinars and Live Events Designed to
          Provide Actionable Academic Insights and Mentorship Opportunities.
        </p>
      </div>

      {/* Main Content Grid - 1220x790 */}
      <div className="w-full max-w-[1220px] h-[790px] flex flex-col lg:flex-row gap-[24px]">
        {/* Left Large Card - 598x790 */}
        <div className="relative w-full lg:w-[598px] h-[790px] rounded-[20px] overflow-hidden flex-shrink-0">
          {/* Background Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900">
            <Image
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=800&fit=crop"
              alt="Presenter at webinar"
              fill
              className="object-cover"
            />
          </div>

          {/* Date Badge */}
          <div
            className="absolute top-[24px] left-1/2 -translate-x-1/2 bg-white rounded-full px-[20px] py-[10px] shadow-sm"
            style={{ fontFamily: "var(--font-sfpro)" }}
          >
            <span className="text-[#252525] text-[16px] leading-[19px] tracking-[-0.03em]">
              19 Oct, 2024 Sat 7:30pm - 10:00pm
            </span>
          </div>

          {/* Bottom Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-[32px] bg-gradient-to-t from-black/95 via-black/80 to-transparent">
            {/* Profile and Time */}
            <div className="flex items-center gap-[12px] mb-[16px]">
              <div className="w-[42px] h-[42px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                <Image
                  src="https://i.pravatar.cc/150?img=12"
                  alt="John Doe"
                  width={42}
                  height={42}
                  className="object-cover"
                />
              </div>
              <div className="flex items-center gap-[8px]">
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
                <span className="text-white text-[18px]">•</span>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  Saturday 9:00PM
                </span>
              </div>
            </div>

            {/* Title */}
            <h3
              className="text-white font-inter font-semibold text-[38px] leading-[46px] tracking-[-0.007em] mb-[24px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Loren Ipsum is here to display the title
            </h3>

            {/* Button */}
            <button
              className="w-full h-[52px] bg-[#0E66FE] hover:bg-[#0d5ce6] text-white rounded-[12px] font-['SF_Pro'] text-[18px] leading-[21px] transition-colors"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              Button
            </button>
          </div>
        </div>

        {/* Right Grid - 598x790 */}
        <div className="w-full lg:w-[598px] h-[790px] grid grid-cols-2 gap-[24px]">
          {/* Top Left Card - 287x383 */}
          <div className="relative w-full h-[383px] rounded-[16px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[16px] py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[32px] leading-[39px] mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=15"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
                <span className="text-white text-[18px]">•</span>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  Saturday 9:00PM
                </span>
              </div>
            </div>
          </div>

          {/* Top Right Card - 287x383 */}
          <div className="relative w-full h-[383px] rounded-[16px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-700 to-amber-900">
              <Image
                src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[16px] py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[32px] leading-[39px] mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=20"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
                <span className="text-white text-[18px]">•</span>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  Saturday 9:00PM
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Left Card - 287x383 */}
          <div className="relative w-full h-[383px] rounded-[16px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-800">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=400&fit=crop"
                alt="Webinar"
                fill
                className="object-cover"
              />
            </div>

            {/* Coming Soon Badge */}
            <div
              className="absolute top-[16px] right-[16px] bg-white rounded-full px-[16px] py-[8px]"
              style={{ fontFamily: "var(--font-sfpro)" }}
            >
              <span className="text-[#021165] text-[12px] leading-[14px]">
                Coming soon
              </span>
            </div>

            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 p-[20px] bg-gradient-to-t from-black/90 to-transparent">
              <h4
                className="text-white font-inter font-bold text-[32px] leading-[39px] mb-[8px]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                Title
              </h4>
              <div className="flex items-center gap-[8px]">
                <div className="w-[32px] h-[32px] rounded-full bg-gray-400 overflow-hidden flex-shrink-0">
                  <Image
                    src="https://i.pravatar.cc/150?img=25"
                    alt="John Doe"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  John Doe
                </span>
                <span className="text-white text-[18px]">•</span>
                <span
                  className="text-white text-[18px] leading-[21px] tracking-[-0.03em]"
                  style={{ fontFamily: "var(--font-sfpro)" }}
                >
                  Saturday 9:00PM
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Right - View All Card - 287x383 */}
          <div className="relative w-full h-[383px] bg-[#E6EAFF] rounded-[16px] flex items-center justify-center cursor-pointer hover:bg-[#dae0ff] transition-colors">
            <p
              className="text-[#042BFD] font-inter font-semibold text-[26px] leading-[31px] tracking-[-0.05em] text-center px-[20px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              View All
              <br />
              Webinars
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
