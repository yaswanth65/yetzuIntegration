import Button from "../ui/Button";

export default function TrustedByLeaders() {
  return (
    <section className="py-8 md:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] min-h-auto bg-[linear-gradient(180deg,_#FFFFFF_0%,_#F8FAFF_40%,_#F5F8FF_60%,_#FFFFFF_100%)] rounded-b-[60px]">
      <div className="w-full max-w-[1224px] mx-auto rounded-[24px] overflow-hidden shadow-[0_16px_40px_-8px_rgba(31,30,130,0.16)] relative">
        {/* Main Combined Image - 16:9 Aspect Ratio */}
        <div className="relative w-full aspect-[16/9] overflow-hidden max-h-[400px] lg:max-h-[500px]">
          <img
            src="/images/testimonals.png"
            alt="Trusted by Leaders from Diverse Educational Institutions and Industries"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for fog effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"></div>
        </div>

        {/* Content: Headline + Subtext + Button - Overlapping the image */}
        <div className="relative -mt-6 sm:-mt-10 md:-mt-12 lg:-mt-16 pt-0 pb-4 px-4 sm:px-6 md:pb-6 md:px-8 lg:pb-8 lg:px-12 text-center bg-white">
          <h2 className="font-inter font-medium text-[22px] sm:text-[30px] md:text-[38px] text-gray-900 mb-1 md:mb-2 leading-[110%] tracking-[-0.04em] capitalize">
            Trusted by <span className="text-blue-600">Leaders</span> From
            Diverse
            <br className="hidden md:block" />
            Educational{" "}
            <span className="text-blue-600">Institutions And Industries.</span>
          </h2>

          <p className="text-gray-600 text-[11px] sm:text-[12px] md:text-sm lg:text-base max-w-full md:max-w-2xl mx-auto mb-4 md:mb-5 lg:mb-6 mt-2 md:mt-3">
            Join a Thriving Community Dedicated to Academic Excellence Supported
            by Cutting-Edge Technology and Expert Mentorship.
          </p>

          <Button className="w-full sm:w-auto mx-auto mt-4">
            Get Invested in Your Academic Success
          </Button>
        </div>
      </div>
    </section>
  );
}
