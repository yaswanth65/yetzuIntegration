import React from 'react'

const Paragraph = ({ text, className }: { text: string, className?: string }) => {
    return (
        <p className={`${className} max-w-[90%] sm:max-w-2xl md:max-w-3xl leading-relaxed font-sfpro`}>
            {text}
        </p>
    )
}

export default Paragraph
