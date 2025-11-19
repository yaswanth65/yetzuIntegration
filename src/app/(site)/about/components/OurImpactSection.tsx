export default function OurImpactSection() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-12 lg:px-[108px] py-12 md:py-14 lg:py-16 bg-[linear-gradient(180deg,_#FFFFFF_0%,_#E2E7FF_50.01%,_#FFFFFF_100%)]">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-12 lg:gap-14">
          {/* Header */}
          <div className="flex flex-col items-center justify-center gap-4 lg:gap-6">
            <h2 className="text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.2] lg:leading-[68px] font-semibold tracking-[-0.02em] text-[#021165] text-center">
              Our Impact
            </h2>
            <p className="text-base leading-[19px] tracking-[-0.03em] text-[#252525] text-center max-w-[370px]">
              Loren ipsum is a free text to use whenever you want content for
              your deogn it , is is a perferct placeholder
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="flex flex-col justify-end items-center p-6 lg:p-8 gap-4 lg:gap-6 w-full h-[250px] lg:h-[288px] bg-[#C4C4C4] rounded-[20px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)]"
              >
                {/* Add your content here */}
                <div className="text-center"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
