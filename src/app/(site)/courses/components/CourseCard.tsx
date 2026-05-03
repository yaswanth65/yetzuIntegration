 "use client";

import Image from "next/image";
import { Course } from "@/lib/queries/courses/types";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Button from "@/components/ui/Button";
import AvatarStack from "@/components/ui/AvatarStack";
import { PaymentAPI } from "@/lib/api";
import { useState } from "react";
import { toast } from "react-hot-toast";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isBuying, setIsBuying] = useState(false);

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

const handleEnroll = async () => {
    if (!course?._id || isBuying) return;

    setIsBuying(true);
    try {
      let amount = Number(course.cost || 0);
      if (amount <= 0) amount = 1;
      
      // Step 1: Create order
      const orderResult = await PaymentAPI.createOrder({
        amount: amount,
        sessionId: course._id,
      });

      console.log("Order created:", orderResult);

      // Step 2: Verify payment (triggers webhook → enrollment)
      const userId = orderResult?.userId || "";
      await PaymentAPI.verifyPayment({
        userId: userId,
        sessionId: course._id,
        amount: amount,
      });

      toast.success(`Successfully enrolled in ${course.title}!`);
      
      // Step 3: Redirect to enrolled courses or refresh
      window.location.href = `/courses/${course._id}`;
    } catch {
      toast.error("Unable to complete enrollment. Please try again.");
    } finally {
      setIsBuying(false);
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-[#EEF0FB] overflow-hidden flex flex-col h-full p-5 shadow-sm hover:shadow-md transition-shadow duration-300">

      {/* Whole Card Click → Details */}
      <Link href={`/courses/${course?._id}`} className="flex flex-col flex-grow group">

        {/* Image */}
        <div className="relative rounded-[24px] overflow-hidden w-full h-[220px] mb-6">
          <Image
            src={getImageUrl(course.thumbnail)}
            alt={course.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Date */}
          <div className="absolute top-3 right-3">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold text-[#021165] border border-[#EEF0FB]">
              {formattedStart(course?.startDateTime)}
            </div>
          </div>

          {/* Avatars */}
          <div className="absolute bottom-3 left-3">
            <AvatarStack count={course.enrolledCount || 5} size={32} />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow gap-2 px-1">
          <h3 className="text-xl font-bold text-[#1B1B1B] leading-tight line-clamp-2 group-hover:text-[#021165] transition-colors">
            {course.title}
          </h3>

          <p className="text-sm text-[#7A7A7A] leading-relaxed line-clamp-2 mb-2">
            {course.description}
          </p>

          <div className="mb-6">
            <span className="text-2xl font-bold text-[#252525]">
              {course.cost === 0 ? "Free" : `₹${course.cost.toFixed(2)}`}
            </span>
          </div>
        </div>
      </Link>

      {/* Buttons */}
      <div className="grid grid-cols-2 gap-4 mt-auto pt-4">

        {/* View Details */}
        <Link href={`/courses/${course?._id}`} className="w-full">
          <Button
            variant="secondary"
            className="!rounded-xl !h-[44px] !text-sm w-full"
          >
            View Details
          </Button>
        </Link>

        {/* Enroll Now */}
        <Button
          onClick={handleEnroll}
          disabled={isBuying}
          className="!rounded-xl !h-[44px] !text-sm w-full"
        >
          {isBuying ? "Processing..." : "Enroll Now"}
        </Button>

      </div>
    </div>
  );
}

export const CourseCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[32px] border border-[#EEF0FB] overflow-hidden flex flex-col h-full p-5 shadow-sm animate-pulse">
      <div className="rounded-[24px] w-full h-[220px] mb-6 bg-gray-200" />
      <div className="flex flex-col flex-grow gap-4 px-1">
        <div className="h-7 bg-gray-200 rounded-lg w-3/4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-lg w-full" />
          <div className="h-4 bg-gray-200 rounded-lg w-5/6" />
        </div>
        <div className="h-8 bg-gray-200 rounded-lg w-24 mb-6" />
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="h-11 bg-gray-200 rounded-xl w-full" />
          <div className="h-11 bg-gray-200 rounded-xl w-full" />
        </div>
      </div>
    </div>
  );
};
