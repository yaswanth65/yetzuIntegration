"use client";

import Image from "next/image";

interface BlogDetailsHeaderProps {
  title: string;
  subtitle: string;
  date: string;
  author: {
    name: string;
    avatar: string;
    time: string;
  };
}

export default function BlogDetailsHeader({
  title,
  subtitle,
  date,
  author,
}: BlogDetailsHeaderProps) {
  return (
    <section className="w-full flex justify-center bg-[linear-gradient(180deg,rgba(255,255,255,0.3)_0%,rgba(121,143,255,0.144)_47.61%,rgba(255,255,255,0.3)_100%)]">
      <div className="w-full max-w-[1440px] flex flex-col items-start px-6 py-12 md:px-[148px] md:py-[52px] gap-10 md:gap-[68px]">

        {/* Title + Subtitle + Date */}
        <div className="flex flex-col gap-6 w-full max-w-[987px]">
          <div className="flex flex-col gap-4">
            {/* Title */}
            <h1 className="font-inter font-medium text-[40px] md:text-[68px] leading-[1.2] tracking-[-0.04em] text-[#252525]">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="font-inter font-semibold text-[18px] md:text-[22px] leading-[27px] tracking-[-0.06em] text-[#252525]">
              {subtitle}
            </p>
          </div>

          {/* Date */}
          <span className="font-sans text-[16px] leading-[19px] tracking-[-0.03em] text-[#252525]">
            {date}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#D9D9D9]">
            <Image
              src={author.avatar}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-sans font-normal text-[18px] leading-[21px] tracking-[-0.03em] text-[#000000]">
              {author.name}
            </p>
            <p className="font-sans font-normal text-[14px] leading-[17px] tracking-[-0.03em] text-[#000000] opacity-80">
              {author.time}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
