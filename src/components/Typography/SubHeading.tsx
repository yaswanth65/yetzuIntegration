import React from 'react'

const SubHeading = ({ text, className }: { text: string, className?: string }) => {
    return (
        <h2 className={` ${className} font-inter font-medium text-[28px] md:text-[36px] lg:text-[46px] leading-[120%] md:leading-[56px] tracking-[-0.06em] text-[#021165]`}>
            {text}
        </h2>
    )
}

export default SubHeading
