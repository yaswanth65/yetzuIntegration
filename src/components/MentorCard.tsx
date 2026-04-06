import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";
import BadgePill from "./BadgePill";
import SubHeading from "./Typography/SubHeading";
import Paragraph from "./Typography/Paragraph";
import { SocialButton } from "./ui/SocialButton";

interface MentorData {
    id: string;
    name: string;
    credentials: string;
    bio: string;
    image: string;
    linkedinUrl?: string;
    email?: string;
}

// Local mentor database
const MENTORS: Record<string, MentorData> = {
    "dr-yethindra": {
        id: "dr-yethindra",
        name: "Dr. Yethindra Vityala",
        credentials: "MBBS | MPH | MBA | DSc h.c.",
        bio: "Dr. Yethindra Vityala is a distinguished Indian physician and researcher, known for his groundbreaking work in endocrinology, neurology, oncology, infectious diseases, and public health. With over 80 published research papers, two authored books, and numerous awards, he is recognized for his contributions to medical science and patient care. His goal is to make healthcare accessible, affordable, and effective, particularly by bridging the gap between research and practical healthcare solutions.",
        image: "/images/educator.jpg",
        linkedinUrl: "https://linkedin.com/in/dr-yethindra",
        email: "contact@example.com"
    },
};

interface MentorCardProps {
    educatorId: string;
}

export default function MentorCard({ educatorId }: MentorCardProps) {
    const mentor = MENTORS[educatorId];

    if (!mentor) {
        return (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 text-center">
                <p className="text-gray-500">Mentor information not available</p>
            </div>
        );
    }

    return (
        <div className="bg-white">
            <BadgePill text="Mentor matrix" className="mb-2 font-bold" />
            <SubHeading text="Learn from the best in industry and academics" level={1} className="mb-8" />
            <div className="grid grid-cols-1 lg:grid-cols-[400px_1fr] gap-6 items-start">
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                    <Image
                        src={mentor.image}
                        alt={mentor.name}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="space-y-6 py-10">
                    <div className="space-y-2">
                        <SubHeading text={mentor.name} level={2} className="text-black" />
                        <Paragraph text={mentor.credentials} className="font-normal text-[#5c5c5c] text-sm md:text-base" />
                    </div>

                    <Paragraph text={mentor.bio} className="font-normal text-black leading-relaxed" />
                    <div className="flex gap-4">
                        {mentor.linkedinUrl && (
                            <SocialButton
                                href={mentor.linkedinUrl}
                                icon={<Linkedin className="w-5 h-5" />}
                                label="LinkedIn"
                                bg="#0A66C2"
                                hoverBg="#004182"
                            />
                        )}

                        {mentor.email && (
                            <SocialButton
                                href={`mailto:${mentor.email}`}
                                icon={<Mail className="w-5 h-5" />}
                                label="Email"
                                bg="#042BFD"
                                hoverBg="#0136D4"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
