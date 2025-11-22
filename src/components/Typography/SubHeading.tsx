import React from "react";

interface SubHeadingProps {
    text: string;
    level?: 1 | 2 | 3 | 4;
    className?: string;
}

const sizeMap = {
    1: "text-[46px] leading-[120%] md:leading-[50px]",
    2: "text-[36px] leading-[120%] md:leading-[42px]",
    3: "text-[30px] leading-[120%] md:leading-[36px]",
    4: "text-[24px] leading-[120%] md:leading-[30px]",
};

const SubHeading = ({ text, level = 1, className }: SubHeadingProps) => {
    return (
        <h2
            className={`
        font-inter font-medium
        tracking-[-0.06em]
        text-[#021165]
        mb-4
        ${sizeMap[level]}
        ${className ?? ""}
      `}
        >
            {text}
        </h2>
    );
};

export default SubHeading;
