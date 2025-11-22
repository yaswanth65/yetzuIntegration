import React from "react";

interface MainHeadingProps {
    text: string;
    highlights?: string[];
    className?: string;
}

const MainHeading: React.FC<MainHeadingProps> = ({
    text,
    highlights = [],
    className = "",
}) => {
    const getHighlightedText = (text: string, highlights: string[]) => {
        if (!highlights.length) return text;

        const escapedHighlights = highlights.map((h) =>
            h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        );

        const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, i) =>
            highlights.some(
                (h) => h.toLowerCase() === part.toLowerCase().trim()
            ) ? (
                <span key={i} className="text-[#042BFD]">
                    {part}
                </span>
            ) : (
                <React.Fragment key={i}>{part}</React.Fragment>
            )
        );
    };

    return (
        <h1
            className={`font-inter font-semibold text-[38px] sm:text-[44px] md:text-[52px] lg:text-[68px] leading-[1.2] tracking-[-0.04em] max-w-[95%] md:max-w-4xl mx-auto relative z-10 mb-3 ${className?.includes("text") ? className : "text-[#252525]"}`}
        >
            {getHighlightedText(text, highlights)}
        </h1>
    );
};

export default MainHeading;
