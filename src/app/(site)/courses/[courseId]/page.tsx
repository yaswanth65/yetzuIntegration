"use client";

import { useParams, useRouter } from "next/navigation";
import {
  useGetCourseById,
  useGetCourses,
} from "@/lib/queries/courses/useCoursesService";
import useSession from "@/hooks/useSession";
import { loadRazorpay, openRazorpayCheckout } from "@/lib/razorpay";
import toast from "react-hot-toast";
import Image from "next/image";
import {
  Loader2,
  AlertCircle,
  Clock,
  Users,
  Calendar,
  Award,
  CheckCircle,
  ChevronDown,
  Figma,
  Activity,
  Check,
  Flag,
  Mail,
  Linkedin,
  Play,
} from "lucide-react";
import Link from "next/link";
import BadgePill from "@/components/BadgePill";
import CourseTopicsAccordion, {
  TopicItem,
} from "@/components/CourseTopicsAccordion";
import CourseCard, {
  CourseCardSkeleton,
} from "@/app/(site)/courses/components/CourseCard";
import { useMemo, useState } from "react";
import CustomTestimonials from "../components/CustomTestimonials";
import PageFAQSection from "@/components/shared/PageFAQSection";
import BookSlotSection from "@/app/(site)/contact-us/components/BookSlotSection";
import MentorCard from "@/components/MentorCard";
import { getImageUrl } from "@/lib/utils/imageUtils";
import Button from "@/components/ui/Button";
import MainHeading from "@/components/Typography/MainHeading";
import AvatarStack from "@/components/ui/AvatarStack";
import SubHeading from "@/components/Typography/SubHeading";
import { PaymentAPI, StudentAPI } from "@/lib/api";
import { useCart } from "@/providers/CartProvider";

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params?.courseId as string;

  const { data: course, isLoading, isError } = useGetCourseById(courseId);
  const { data: allCourses, isLoading: isCoursesLoading } = useGetCourses();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { user, isUserLoggedIn } = useSession();

  const randomCourses = useMemo(() => {
    if (!allCourses || !courseId) return [];
    const otherCourses = allCourses.filter((c) => c._id !== courseId);
    const shuffled = [...otherCourses].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [allCourses, courseId]);

  const outcomesList = useMemo(() => {
    const list = [
      ...(course?.outcomes || []),
      ...(course?.benefits || [])
    ];
    if (list.length === 0) {
      return [
        "Learn industry-relevant skills",
        "Learn industry-relevant skills",
        "Learn industry-relevant skills",
        "Learn industry-relevant skills"
      ];
    }
    return list;
  }, [course]);

  const syllabusList = useMemo(() => {
    if (course?.syllabus && course.syllabus.length > 0) {
      return course.syllabus;
    }
    return [
      { _id: "1", title: "Title", desc: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list." },
      { _id: "2", title: "Title", desc: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list." },
      { _id: "3", title: "Title", desc: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list." },
      { _id: "4", title: "Title", desc: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list." },
      { _id: "5", title: "Title", desc: "Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list." }
    ];
  }, [course]);

  const handleBuyNow = async () => {
    if (!course || isCreatingOrder) return;
    if (!isUserLoggedIn) {
      toast.error("Please log in to purchase this course.");
      router.push(`/login?callback=/courses/${courseId}`);
      return;
    }
    const amount = Number(course.cost);
    if (amount <= 0) {
      toast.error("This course is not available for purchase.");
      return;
    }
    setIsCreatingOrder(true);
    try {
      await loadRazorpay();

      // Step 1: Try creating Razorpay order on production
      const orderResult = await PaymentAPI.createOrder({
        amount,
        sessionId: courseId,
      });

      const orderData = orderResult?.data || orderResult;
      const razorpayOrderId = orderData?.orderId || orderData?.id || "";
      const keyId = orderData?.keyId || "";

      if (!razorpayOrderId || !keyId) {
        throw new Error("Failed to create payment order. Missing order ID or key.");
      }

      // Step 2: Open Razorpay checkout
      openRazorpayCheckout({
        keyId,
        orderId: razorpayOrderId,
        amount,
        currency: orderData?.currency || "INR",
        title: course.title || "Course Purchase",
        userName: user?.name,
        userEmail: user?.email,
        onSuccess: async (paymentId: string, orderId: string, signature: string) => {
          // Payment captured — trigger enrollment via local webhook
          try {
            await PaymentAPI.verifyPayment({
              userId: user?.id || "",
              sessionId: courseId,
              amount,
            });
            toast.success(`Enrolled successfully in ${course.title}!`);
            router.push("/s/dashboard");
          } catch (err: any) {
            console.error("Enrollment after payment failed:", err);
            toast.error(err?.message || "Payment succeeded but enrollment failed. Contact support.");
            setIsCreatingOrder(false);
          }
        },
        onDismiss: () => {
          setIsCreatingOrder(false);
          toast("Payment cancelled.", { icon: "ℹ️" });
        },
      });
    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.message || "";
      const isUnavailable = errMsg.includes("unavailable") || errMsg.includes("cannot be purchased");

      if (isUnavailable) {
        // Fallback: enroll via local webhook (dev/test)
        console.warn("createOrder unavailable, falling back to local webhook");
        try {
          await PaymentAPI.verifyPayment({
            userId: user?.id || "",
            sessionId: courseId,
            amount,
          });
          toast.success(`Enrolled successfully in ${course.title}!`);
          router.push("/s/dashboard");
          return;
        } catch (fallbackErr: any) {
          console.error("Local webhook fallback also failed:", fallbackErr);
          toast.error(fallbackErr?.response?.data?.error || "Unable to complete enrollment. Please try again.");
        }
      } else {
        toast.error(errMsg || "Unable to complete enrollment. Please try again.");
      }
      setIsCreatingOrder(false);
    }
  };

  if (isLoading) {
    return <CoursePageSkeleton />;
  }

  if (isError || !course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-8 h-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Course Not Found
        </h2>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          We couldn't find the course you're looking for. It may have been
          removed or doesn't exist.
        </p>
        <Link href="/courses">
          <Button variant="primary" className="!w-fit px-8">
            Back to Courses
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-[#F8FAFF] pt-10 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
        <div className="max-w-[1224px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="flex flex-col justify-center items-start gap-8 md:gap-11 w-full max-w-[657px]">
              <h1 className="font-inter font-medium text-[32px] sm:text-[40px] md:text-[56px] leading-[1.2] md:leading-[68px] tracking-[-0.02em] text-[#021165]">
                {course?.title}
              </h1>

              <div className="flex flex-col items-start gap-2 md:gap-4 w-full max-w-[465px]">
                <h2 className="font-inter font-semibold text-[18px] sm:text-[20px] md:text-[22px] leading-[27px] tracking-[-0.06em] text-[#252525]">
                  {course?.subtitle ||
                    "One-on-one sessions focused on your personal academic needs and growth"}
                </h2>

                <p className="font-sfpro font-normal text-[12px] leading-[14px] text-[#252525] max-w-[399px]">
                  {course?.description ||
                    "All educational materials, course content, documentation, and tools are protected by copyright. It is an offense to embed a filtration, and tools exclusive license to use this material solely for your personal, non-commercial educational purposes."}
                </p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#021165]" />
                    <span className="font-sfpro font-normal text-[16px] leading-[19px] tracking-[-0.03em] text-[#021165]">
                      Starts:{" "}
                      {new Date(course.startDateTime).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#021165]" />
                    <span className="font-sfpro font-normal text-[16px] leading-[19px] tracking-[-0.03em] text-[#021165]">
                      Duration: {course.duration}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-2 w-full max-w-[399px]">
                <p className="font-sfpro font-normal text-[18px] leading-[21px] tracking-[-0.03em] text-[#252525]">
                  Already joined
                </p>
                <div className="flex items-center gap-2">
                  <AvatarStack count={course.enrolledCount || 5} />
                </div>
              </div>
            </div>

            <div className="relative w-full aspect-video h-full rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={getImageUrl(course.thumbnail)}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play
                    className="w-6 h-6 text-[#042BFD]"
                    fill="#042BFD"
                    opacity={0.6}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] bg-white">
        <div className="max-w-[1224px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            <div className="space-y-14">
              {/* Topics To Be Covered Accordions */}
              <div className="max-w-[680px]">
                <SubHeading text="Topics To Be Covered" level={3} className="font-semibold tracking-tight !mb-6 text-[#021165]" />
                <CourseTopicsAccordion
                  items={syllabusList}
                  firstExpanded={true}
                />
              </div>

              {/* Next Steps Timeline Card */}
              <div>
                <SubHeading text="Next Steps" level={3} className="font-semibold tracking-tight !mb-6 text-[#021165]" />
                <div className="w-full max-w-[480px] bg-white rounded-[24px] p-6 sm:p-8 border border-[#EDF0F7] shadow-[0_16px_32px_-12px_rgba(31,30,130,0.08)]">
                  <div className="flex flex-col gap-8">
                    {["Loren ipsum", "Loren ipsum", "Loren ipsum", "Loren ipsum"].map((title, idx) => (
                      <div key={idx} className="flex items-start gap-5 relative">
                        {/* Connecting vertical line */}
                        {idx !== 3 && (
                          <div className="absolute left-[20px] top-[40px] bottom-[-32px] w-[2px] bg-[#E6EAFF]" />
                        )}
                        {/* Circle badge container */}
                        <div className="w-10 h-10 rounded-full bg-[#F2F4FF] flex items-center justify-center flex-shrink-0 relative z-10">
                          <Activity className="w-5 h-5 text-[#042BFD]" />
                        </div>
                        {/* Title and details */}
                        <div className="flex flex-col gap-1">
                          <h4 className="font-semibold text-lg text-[#252525] leading-tight">
                            {title}
                          </h4>
                          <p className="text-sm text-[#5C5C5C] leading-snug">
                            Lorem ipsum is a good way to start your design Lorem
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Things You'll Get */}
              <div>
                <SubHeading text="Things You'll Get" level={3} className="font-semibold tracking-tight !mb-6 text-[#021165]" />
                <div className="flex flex-wrap gap-3">
                  <BadgePill
                    text="Certificate"
                    icon={<Check className="w-4 h-4" />}
                  />
                  <BadgePill
                    text="PDF Summary"
                    icon={<Check className="w-4 h-4" />}
                  />
                  <BadgePill
                    text="Templates"
                    icon={<Check className="w-4 h-4" />}
                  />
                  <BadgePill
                    text="1:1 Q&A Session"
                    icon={<Check className="w-4 h-4" />}
                  />
                </div>
              </div>

              {/* Value You'll Receive */}
              <div>
                <SubHeading text="Value You'll Receive" level={3} className="font-semibold tracking-tight !mb-6 text-[#021165]" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {outcomesList.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-[#EDF0F7] rounded-xl p-5 bg-white flex items-center gap-4 shadow-sm"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F2F4FF] flex items-center justify-center flex-shrink-0">
                        <Activity className="w-5 h-5 text-[#042BFD]" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-[#252525] text-[16px] leading-tight">{item}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Who Is This For */}
              <div>
                <SubHeading text="Who Is This For" level={3} className="font-semibold tracking-tight !mb-6 text-[#021165]" />
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed text-[16px]">
                    Lorem ipsum is a good way to start your design Loren ipsum
                    is a good way for your design Lorem ipsum is a good way to
                    start your design Loren ipsum is a good way for your design
                    Lorem ipsum is a good way to start your design Loren ipsum
                    is a good way for your design Lorem ipsum is a good way to
                    start your design Loren ipsum is a good way for your design
                  </p>
                  <ul className="space-y-3 mt-4">
                    {["Lorem ipsum", "Lorem ipsum", "Lorem ipsum"].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#042BFD] flex-shrink-0" />
                        <span className="text-gray-700 text-[16px]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-white shadow-none rounded-2xl px-4 py-3 sticky top-24 space-y-4 border border-[#EDF0F7]">
                <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                  <Image
                    src={getImageUrl(course.thumbnail)}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                      <Play
                        className="w-6 h-6 text-[#042BFD]"
                        fill="#042BFD"
                        opacity={0.6}
                      />
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-bold text-[#172B85]">
                    {course.cost === 0
                      ? "Free"
                      : `₹${course.cost.toLocaleString()}`}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
                    <Clock className="w-4 h-4 text-[#5C5C5C]" />
                    <span>
                      Starts:{" "}
                      {new Date(course.startDateTime).toLocaleDateString(
                        "en-GB",
                        { day: "numeric", month: "short", year: "numeric" },
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5C5C5C]">
                    <Calendar className="w-4 h-4 text-[#5C5C5C]" />
                    <span>Duration: {course.duration}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {isInCart(courseId) ? (
                    <Link href="/cart" className="w-full block">
                      <Button variant="secondary" className="w-full">
                        Go to Cart
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="primary"
                      className="w-full"
                      disabled={!course.isActive}
                      onClick={() => addToCart(course)}
                    >
                      Add to Cart
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="w-full"
                    disabled={!course.isActive || isCreatingOrder}
                    onClick={handleBuyNow}
                  >
                    {isCreatingOrder ? "Creating Order..." : "Buy Now"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-26">
            <SubHeading
              text="View Similar Courses"
              level={1}
              className="mb-10"
            />
            {isCoursesLoading && (
              <>
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
              </>
            )}
            {!isCoursesLoading && randomCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {randomCourses.map((randomCourse) => (
                  <CourseCard key={randomCourse._id} course={randomCourse} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No similar courses available.</p>
            )}
          </div>

          <div className="mt-24">
            <MentorCard educatorId="dr-yethindra" />
          </div>
        </div>
      </section>
      <CustomTestimonials />
      <div className="py-12">
        <PageFAQSection pageKey="courses" />
      </div>
      <BookSlotSection />
    </main>
  );
}

const CoursePageSkeleton = () => {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-[#F8FAFF] pt-24 pb-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px]">
        <div className="max-w-[1224px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 animate-pulse">
              <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-full"></div>
              <div className="h-4 bg-gray-200 rounded-lg w-5/6"></div>
              <div className="flex gap-6 pt-2">
                <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
                <div className="h-8 bg-gray-200 rounded-lg w-32"></div>
              </div>
              <div className="pt-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded-lg w-24"></div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 bg-gray-200 rounded-full"
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full aspect-video bg-gray-200 rounded-2xl animate-pulse"></div>
          </div>
        </div>
      </section>
      <section className="relative py-16 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] bg-white">
        <div className="max-w-[1224px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            <div className="space-y-12 animate-pulse">
              <div>
                <div className="h-8 bg-gray-200 rounded-lg w-64 mb-6"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-6 rounded-xl h-32"
                    ></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-8 bg-gray-200 rounded-lg w-56 mb-6"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-14 bg-gray-100 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
            <div className="animate-pulse">
              <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-6">
                <div className="w-full aspect-video bg-gray-200 rounded-xl"></div>
                <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded-lg"></div>
                  <div className="h-6 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-12 bg-gray-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
