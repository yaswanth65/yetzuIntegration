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
import { useCart } from "@/providers/CartProvider";
import CourseHoverCard from "@/components/shared/CourseHoverCard";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const [isBuying, setIsBuying] = useState(false);
  const { addToCart, isInCart } = useCart();

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredPosition, setHoveredPosition] = useState<"left" | "right">("right");

  const handleMouseEnter = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const screenWidth = window.innerWidth;
    const position = rect.left + rect.width / 2 > screenWidth / 2 ? "left" : "right";
    setHoveredPosition(position);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

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
      const amount = Number(course.cost || 0);

      if (amount <= 0) {
        await PaymentAPI.createOrder({
          sessionIds: [course._id],
          currency: "INR",
        });
        toast.success(`Successfully enrolled in ${course.title}!`);
        window.location.href = `/courses/${course._id}`;
        return;
      }

      // Step 1: Create Razorpay order
      const orderResult = await PaymentAPI.createOrder({
        amount: amount,
        sessionId: course._id,
      });

      const orderData = orderResult?.data || orderResult;
      const razorpayOrderId = orderData?.orderId || orderData?.id || "";
      const keyId = orderData?.keyId || "";

      if (!razorpayOrderId || !keyId) {
        throw new Error("Failed to create payment order.");
      }

      // Step 2: Open Razorpay checkout
      const { loadRazorpay, openRazorpayCheckout } = await import("@/lib/razorpay");
      await loadRazorpay();
      openRazorpayCheckout({
        keyId,
        orderId: razorpayOrderId,
        amount,
        currency: orderData?.currency || "INR",
        title: course.title || "Course Purchase",
        userName: "",
        userEmail: "",
        onSuccess: () => {
          toast.success(`Successfully enrolled in ${course.title}!`);
          window.location.href = `/courses/${course._id}`;
        },
        onDismiss: () => {
          setIsBuying(false);
        },
      });
    } catch {
      toast.error("Unable to complete enrollment. Please try again.");
      setIsBuying(false);
    }
  };

  return (
    <div
      className="relative group bg-white rounded-[16px] flex flex-col w-full min-h-[452px] h-auto p-[12px] gap-[8px] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.1)] transition-shadow duration-300 mx-auto"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Thumbnail + Date + Avatars (wrapped in Link for clickability) */}
      <Link href={`/courses/${course?._id}`} className="relative rounded-[12px] overflow-hidden w-full h-[220px] flex-shrink-0 block">
        <Image
          src={getImageUrl(course.thumbnail)}
          alt={course.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Date Pill */}
        <div className="absolute top-[16px] right-[18px] z-10">
          <div className="bg-[#E6EAFF] px-[16px] py-[8px] h-[30px] rounded-full flex items-center justify-center text-[12px] font-normal text-[#021165] leading-[14px] font-sans">
            {formattedStart(course?.startDateTime)}
          </div>
        </div>

        {/* Avatar Stack */}
        <div className="absolute bottom-[16px] left-[18px] z-10">
          <AvatarStack count={course.enrolledCount || 5} size={36} />
        </div>
      </Link>

      {/* Content Container */}
      <div className="flex flex-col justify-between items-start p-[12px] gap-[20px] w-full min-h-[200px] h-auto flex-shrink-0">
        
        {/* Text Block (wrapped in Link for clickability) */}
        <Link href={`/courses/${course?._id}`} className="flex flex-col items-start gap-[8px] w-full block hover:opacity-95 transition-opacity">
          <h3 className="text-[26px] font-medium text-[#252525] leading-[31px] tracking-[-0.05em] w-full font-sans">
            {course.title}
          </h3>
          <p className="text-[16px] font-normal text-[#5C5C5C] leading-[19px] tracking-[-0.03em] line-clamp-2 w-full font-sans">
            {course.description}
          </p>
          <div className="text-[26px] font-medium text-[#252525] leading-[31px] tracking-[-0.05em] font-sans">
            {course.cost === 0 ? "Free" : `₹${course.cost.toFixed(2)}`}
          </div>
        </Link>

        {/* Buttons Row */}
        <div className="flex flex-row items-center gap-[24px] w-full h-[40px]">
          {/* View Details */}
          <Link href={`/courses/${course?._id}`} className="flex-1">
            <Button
              variant="secondary"
              rounded="lg"
              className="!h-10 !text-[16px] !leading-[19px] py-[8px] px-[16px] !rounded-lg w-full flex items-center justify-center tracking-[-0.03em] font-normal shadow-[0_2px_4px_rgba(31,30,130,0.04)] bg-white border border-[#294BFD] text-[#042BFD] hover:bg-[#042BFD] hover:text-white transition"
            >
              View Details
            </Button>
          </Link>

          {/* Add to Cart / Go to Cart */}
          {isInCart(course._id) ? (
            <Link href="/cart" className="flex-1">
              <Button
                variant="secondary"
                rounded="lg"
                className="!h-10 !text-[16px] !leading-[19px] py-[8px] px-[16px] !rounded-lg w-full flex items-center justify-center tracking-[-0.03em] font-normal shadow-[0_2px_4px_rgba(31,30,130,0.04)] bg-white border border-[#294BFD] text-[#042BFD] hover:bg-[#042BFD] hover:text-white transition"
              >
                Go to Cart
              </Button>
            </Link>
          ) : (
            <div className="flex-1">
              <Button
                onClick={() => addToCart(course)}
                variant="primary"
                rounded="lg"
                className="!h-10 !text-[16px] !leading-[19px] py-[8px] px-[16px] !rounded-lg w-full flex items-center justify-center tracking-[-0.03em] font-normal shadow-[0_2px_4px_rgba(31,30,130,0.04)] bg-[#042BFD] text-white hover:bg-[#021DC0]"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </div>

      {isHovered && (
        <div className="hidden lg:block">
          <CourseHoverCard
            courseId={course._id}
            position={hoveredPosition}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
          />
        </div>
      )}
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
