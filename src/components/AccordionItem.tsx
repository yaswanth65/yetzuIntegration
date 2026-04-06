import { motion } from "framer-motion";

export default function AccordionItem({
    question,
    answer,
    isOpen,
    onClick,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}) {
    return (
        <div className="border border-[#E6EAFF] rounded-lg bg-[#E6EAFF] text-[#021165]">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800"
            >
                <span className="text-[#021165]">{question}</span>
                <span className="text-[blue]  text-[24px] ">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 text-gray-600"
                >
                    {answer}
                </motion.div>
            )}
        </div>
    );
}
