import React from 'react'

const Paragraph = ({ text, className }: { text: string, className?: string }) => {
    return (
        <p className={`${className} text-gray-600 max-w-[90%] sm:max-w-2xl md:max-w-3xl text-[14px] sm:text-[16px] md:text-[18px] leading-relaxed font-sfpro font-normal`}>
            {text}
        </p>
    )
}

export default Paragraph
