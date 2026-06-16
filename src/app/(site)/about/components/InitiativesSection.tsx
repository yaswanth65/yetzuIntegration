export default function InitiativesSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-12 md:py-14 lg:py-16">
      <div className="w-full">
        <div className="flex flex-col gap-6 lg:gap-14">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <h2 className="font-inter font-medium text-[26px] sm:text-[32px] md:text-[40px] lg:text-[46px] leading-[100%] tracking-[-0.06em] text-[#021165] capitalize text-center">
              Initiatives
            </h2>
            <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] text-center max-w-[500px]">
              Lorem ipsum is a free text to use whenever you want content for
              your design.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex flex-col justify-center items-center p-6 sm:p-6 lg:py-12 h-[380px] sm:h-[350px] lg:h-[376px] bg-[#E6EAFF] rounded-[16px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)] overflow-hidden"
              >
                {/* Blue Gradient Background Blur */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-[280px] h-[280px] bg-gradient-to-br from-blue-400/40 via-blue-500/30 to-blue-600/40 rounded-full blur-3xl opacity-60" />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col items-center gap-2 text-center">
                  <p className="text-[14px] leading-[17px] text-[#404040]">
                    Year {i}
                  </p>
                  <h3 className="text-[26px] leading-[31px] font-medium tracking-[-0.05em] text-[#252525]">
                    Lorem ipsum dolor
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
