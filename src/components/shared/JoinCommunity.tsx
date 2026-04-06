"use client";

import Image from "next/image";
import Button from "../ui/Button";

export default function JoinCommunity() {
  return (
    <section className="bg-gradient-to-b from-white via-[#E2E7FF] to-white min-h-auto flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 md:py-10 lg:py-12">
      <div className="w-full max-w-[1224px] mx-auto">
        <div className="rounded-3xl overflow-hidden shadow-xl md:p-[64px_76px_64px_83px] p-6 flex flex-col md:flex-row items-center md:gap-[101px] gap-8 bg-[#252525] md:h-[523px]">
          {/* Left Content */}
          <div className="w-full md:w-[571px] md:h-[333px] flex flex-col md:gap-[40px] gap-6 text-center md:text-left">
            <div className="flex flex-col md:gap-[16px] gap-4 md:h-[241px]">
              <h2 className="font-[Inter] font-medium text-[28px] md:text-[36px] lg:text-[46px] md:leading-[56px] leading-[120%] tracking-[-0.06em] text-white md:h-[168px]">
                Join Thousands of <br /> Successful
                <span className="text-[#9BAAFE]"> Learners &</span> <br />
                <span className="text-[#9BAAFE]">Educators</span>
              </h2>

              <p className="font-[SF Pro] text-[#E6EAFF] text-[14px] md:text-[16px] md:leading-[19px] leading-[150%] tracking-[-0.03em] md:w-[519px] md:h-[57px] mx-auto md:mx-0 font-normal">
                Lorem ipsum, can be used for free any where for anything. It is
                an effective tool to solve text-related problems. It can be used
                freely and efficiently for learning and education.
              </p>
            </div>

            <div className="md:h-[52px]">
              <Button
                variant="secondary"
                className="!bg-[#E6EAFF] !text-[#021165] !border-[#0325D7] hover:!bg-[#d9e0ff] !w-full sm:!w-[172px]"
              >
                Get started today
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-[384px] md:h-[395px] flex justify-center md:justify-end">
            <div className="rounded-xl overflow-hidden shadow-none w-full max-w-[384px]">
              <Image
                src="/images/Success.png"
                alt="Join Our Community"
                width={384}
                height={395}
                className="w-full h-auto object-cover opacity-100"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
