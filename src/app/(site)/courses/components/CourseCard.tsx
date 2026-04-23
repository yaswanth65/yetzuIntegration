import Image from "next/image";
import { Course } from "@/lib/queries/courses/types";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import BadgePill from "@/components/BadgePill";
import Button from "@/components/ui/Button";
import AvatarStack from "@/components/ui/AvatarStack";

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    const formattedStart = (startDate: string) => {
        if (!startDate) return "";

        const date = new Date(startDate);

        const day = date.toLocaleDateString("en-US", { weekday: "short" });
        const time = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        }).toLowerCase();

        return `${day} ${time}`;
    };
    return (
        <div
            className="
      bg-white 
      rounded-[32px]
      border border-[#EEF0FB]
      overflow-hidden
      flex flex-col
      h-full
      p-5
      shadow-sm
    "
        >
            <div className="relative rounded-[24px] overflow-hidden w-full h-[220px] mb-6">
                <Image
                    src={getImageUrl(course.thumbnail)}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-[#021165] border border-[#EEF0FB]">
                        {formattedStart(course?.startDateTime)}
                    </div>
                </div>
                <div className="absolute bottom-3 left-3">
                    <AvatarStack count={course.enrolledCount || 5} size={32} />
                </div>
            </div>
            <div className="flex flex-col flex-grow gap-2 px-1">
                <h3
                    className="
          text-xl
          font-bold
          text-[#1B1B1B]
          leading-tight
          overflow-hidden
    text-ellipsis
    display-webkit-box
    webkit-line-clamp-2
    webkit-box-orient-vertical
        "
                >
                    {course.title}
                </h3>
                <p
                    className="
    text-sm
    text-[#7A7A7A]
    leading-relaxed
    overflow-hidden
    text-ellipsis
    display-webkit-box
    webkit-line-clamp-2
    webkit-box-orient-vertical
    mb-2
  "
                >
                    {course.description}
                </p>
                <div className="mb-6">
                    <span
                        className="
            text-2xl 
            font-bold 
            text-[#252525]
          "
                    >
                        {course.cost === 0 ? "Free" : `₹${course.cost.toFixed(2)}`}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-auto">
                    <Link
                        href={`/courses/${course._id}`}
                        className="w-full"
                    >
                        <Button variant="secondary" className="!rounded-xl !h-[44px] !text-sm">Button</Button>
                    </Link>
                    <Button className="!rounded-xl !h-[44px] !text-sm">Button</Button>
                </div>
            </div>
        </div>
    );
}

export function CourseCardSkeleton() {
    return (
        <div
            className="
        bg-white 
        rounded-[16px]
        border border-[#EEF0FB]
        overflow-hidden
        flex flex-col
        h-full
        p-3
        animate-pulse
      "
        >
            <div className="relative rounded-[12px] overflow-hidden w-full h-[220px] mb-4 bg-gray-200" />
            <div className="flex flex-col flex-grow gap-3 px-1">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-6 bg-gray-200 rounded w-24 mt-2 mb-6" />
                <div className="grid grid-cols-2 gap-6 mt-auto">
                    <div className="h-11 bg-gray-200 rounded-lg" />
                    <div className="h-11 bg-gray-300 rounded-lg" />
                </div>
            </div>
        </div>
    );
}
