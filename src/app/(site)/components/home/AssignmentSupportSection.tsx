import Button from "@/components/ui/Button";

export default function AssignmentSupportSection() {
  return (
    <section className="flex justify-center bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_45%,#FFFFFF_100%)] py-12 md:py-14 lg:py-16 px-4 sm:px-6 md:px-12 lg:px-[108px]">
      <div className="w-full max-w-[1224px]">
        {/* ===== Header Row ===== */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-8 md:mb-14 lg:mb-16 gap-4 md:gap-6">
          <h2 className="font-inter font-semibold text-[#021165] text-[38px] sm:text-[38px] md:text-[40px] lg:text-[46px] leading-[100%] md:leading-[56px] tracking-[-0.7%] max-w-full md:max-w-[640px]">
            How Yetzu Supports Your Academic Assignments
          </h2>
          <Button
            variant="primary"
            className="!w-fit px-8 !h-[48px] whitespace-nowrap"
          >
            Submit Now
          </Button>
        </div>

        {/* ===== Cards Grid ===== */}
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4 md:gap-6">
            {/* Left Large Card */}
            <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
              <img
                src="/images/Assignment Submission Card.png"
                alt="Assignment Submission"
                className="absolute top-0 right-0 w-[240px] md:w-[360px] h-[240px] md:h-[360px] object-contain"
              />
              <div className="relative z-10 max-w-full md:max-w-[330px]">
                <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                  Assignment Submission &<br />
                  Reception
                </h3>
                <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                  Students submit their assignments directly on Yetzu,
                  initiating their academic task journey.
                </p>
              </div>
            </div>

            {/* Right Small Card */}
            <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
              <img
                src="/images/assignment.png"
                alt="Structured Feedback"
                className="absolute top-[8px] right-[8px] w-[180px] md:w-[260px] h-[230px] md:h-[330px] object-contain"
              />
              <div className="relative z-10 max-w-full md:max-w-[330px]">
                <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                  Structured Feedback &<br />
                  Mentorship
                </h3>
                <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                  Assignments undergo detailed review including proofreading,
                  with students engaging mentors for clarifications and targeted
                  guidance.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-4 md:gap-6">
            {/* Left Small Card */}
            <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
              <img
                src="/images/Progress Tracking Image.png"
                alt="Progress Tracking"
                className="absolute top-[8px] right-[16px] w-[180px] md:w-[260px] h-[230px] md:h-[330px] object-contain"
              />
              <div className="relative z-10 max-w-full md:max-w-[330px]">
                <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                  Progress Tracking &<br />
                  Finalization
                </h3>
                <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                  Students track their assignment progress transparently,
                  refining their work based on feedback until ready for
                  submission.
                </p>
              </div>
            </div>

            {/* Right Large Card */}
            <div className="relative w-full min-h-[320px] md:min-h-[377px] rounded-[20px] bg-white shadow-[0_20px_40px_-12px_rgba(31,30,130,0.1)] p-6 md:p-8 flex flex-col justify-end overflow-hidden">
              <img
                src="/images/Certificates Visual.png"
                alt="Certificates"
                className="absolute top-[4px] right-[8px] w-[240px] md:w-[340px] h-[230px] md:h-[330px] object-contain"
              />
              <div className="relative z-10 max-w-full md:max-w-[330px]">
                <h3 className="font-inter font-semibold text-[#252525] text-[18px] md:text-[22px] leading-[140%] md:leading-[27px] tracking-[-0.06em] mb-2 md:mb-3">
                  Certification & Recognition
                </h3>
                <p className="font-sfpro text-[#5C5C5C] text-[13px] md:text-[14px] leading-[150%] md:leading-[20px]">
                  Upon final approval, students receive official recognition or
                  certification from Yetzu, validating their academic
                  achievement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
