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
      rounded-[16px]
      border border-[#EEF0FB]
      overflow-hidden
      flex flex-col
      h-full
      p-3
    "
        >
            <div className="relative rounded-[12px] overflow-hidden w-full h-[220px] mb-4">
                <Image
                    src={getImageUrl(course.thumbnail)}
                    alt={course.title}
                    fill
                    className="object-cover"
                />
                <BadgePill className="absolute top-2 right-2" text={formattedStart(course?.startDateTime)} />
                <div className="absolute bottom-3 left-3 flex items-center -space-x-2">
                    <AvatarStack count={course.enrolledCount || 5} size={35} />
                </div>
            </div>
            <div className="flex flex-col flex-grow gap-2 px-1">
                <h3
                    className="
          text-2xl
          font-semibold
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
    text-md
    text-[#7A7A7A]
    leading-relaxed
    overflow-hidden
    text-ellipsis
    display-webkit-box
    webkit-line-clamp-2
    webkit-box-orient-vertical
  "
                >
                    {course.description}
                </p>
                <div className="mb-5">
                    <span
                        className="
            text-2xl 
            font-semibold 
            text-[#252525]
          "
                    >
                        {course.cost === 0 ? "Free" : `₹${course.cost.toFixed(2)}`}
                    </span>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-auto">
                    <Link
                        href={`/courses/${course._id}`}
                    >
                        <Button variant="secondary">View details</Button>
                    </Link>
                    <Button>Enroll now</Button>
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
