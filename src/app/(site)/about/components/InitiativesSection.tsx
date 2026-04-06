export default function InitiativesSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-12 lg:gap-14">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 lg:gap-6">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.2] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#021165] text-center">
              Initiatives
            </h2>
            <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] text-center max-w-[500px]">
              Lorem ipsum is a free text to use whenever you want content for
              your design.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col sm:flex-row lg:flex-row items-stretch justify-center gap-4 lg:gap-4 mx-auto flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative flex flex-col justify-center items-center p-6 w-full sm:w-[calc(50%-8px)] lg:w-[280px] h-[320px] sm:h-[350px] lg:h-[376px] bg-[#E6EAFF] rounded-[16px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)] overflow-hidden"
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
                  <h3 className="text-[26px] leading-[31px] font-semibold tracking-[-0.05em] text-[#252525]">
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
