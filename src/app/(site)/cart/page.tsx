"use client";

import React, { useState } from "react";
import { useCart } from "@/providers/CartProvider";
import useSession from "@/hooks/useSession";
import { PaymentAPI } from "@/lib/api";
import { loadRazorpay, openRazorpayCheckout } from "@/lib/razorpay";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/utils/imageUtils";
import { Trash2, ArrowRight, ShieldCheck, Tag, Loader2, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { useGetCourses } from "@/lib/queries/courses/useCoursesService";
import CourseCard, { CourseCardSkeleton } from "@/app/(site)/courses/components/CourseCard";

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart, cartCount } = useCart();
  const { user, isUserLoggedIn } = useSession();
  const router = useRouter();

  const { data: allCourses, isLoading: isCoursesLoading } = useGetCourses();
  const displayExploreCourses = allCourses
    ? allCourses.filter((c) => !cartItems.some((item) => item._id === c._id)).slice(0, 3)
    : [];

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Total price calculation
  const subtotal = cartItems.reduce((acc, item) => acc + (item.cost || 0), 0);
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toLowerCase() === "freeyetzu") {
      setAppliedCoupon(couponCode);
      setDiscountAmount(subtotal);
      toast.success("Coupon code applied! Cart is now free.");
    } else if (couponCode.toLowerCase() === "yetzu20") {
      const discount = Math.round(subtotal * 0.2);
      setAppliedCoupon(couponCode);
      setDiscountAmount(discount);
      toast.success("Coupon code applied! 20% discount.");
    } else {
      toast.error("Invalid coupon code.");
    }
  };

  const handleCheckout = async () => {
    if (cartCount === 0) return;
    if (!isUserLoggedIn) {
      toast.error("Please log in to proceed.");
      router.push("/login?callback=/cart");
      return;
    }

    setIsCheckingOut(true);
    try {
      const sessionIds = cartItems.map((item) => item._id).filter(Boolean);

      if (total <= 0) {
        await PaymentAPI.createOrder({
          sessionIds,
          currency: "INR",
        });
        toast.success("Success! Enrolled in sessions.");
        clearCart();
        setIsCheckingOut(false);
        router.push("/s/dashboard");
        return;
      }

      await loadRazorpay();

      const totalAmount = Math.max(1, total);

      // Step 1: Try creating a single Razorpay order for all items
      const orderResult = await PaymentAPI.createOrder({
        amount: totalAmount,
        sessionIds,
      });

      const orderData = orderResult?.data || orderResult;
      const razorpayOrderId = orderData?.orderId || orderData?.id || "";
      const keyId = orderData?.keyId || "";

      if (!razorpayOrderId || !keyId) {
        throw new Error("Failed to create payment order.");
      }

      // Step 2: Open Razorpay checkout
      openRazorpayCheckout({
        keyId,
        orderId: razorpayOrderId,
        amount: totalAmount,
        currency: orderData?.currency || "INR",
        title: `Yetzu Cart (${cartCount} items)`,
        userName: user?.name,
        userEmail: user?.email,
        onSuccess: () => {
          // Payment captured — Razorpay will call the production webhook to finalize enrollment.
          toast.success("Success! Enrolled in sessions.");
          clearCart();
          router.push("/s/dashboard");
        },
        onDismiss: () => {
          setIsCheckingOut(false);
          toast("Payment cancelled.", { icon: "ℹ️" });
        },
      });
    } catch (error: any) {
      const errMsg = error?.response?.data?.error || error?.message || "";
      const isUnavailable = errMsg.includes("unavailable") || errMsg.includes("cannot be purchased");

      if (isUnavailable) {
        // Fallback: enroll items individually via local webhook (dev/test)
        console.warn("createOrder unavailable, falling back to local webhook for each item");
        try {
          const userId = user?.id || "";
          for (const item of cartItems) {
            await PaymentAPI.verifyPayment({
              userId,
              sessionId: item._id,
              amount: Math.max(1, Number(item.cost) || 1),
            });
          }
          toast.success("Success! Enrolled in sessions.");
          clearCart();
          router.push("/s/dashboard");
          return;
        } catch (fallbackErr: any) {
          console.error("Local webhook fallback failed:", fallbackErr);
          toast.error(fallbackErr?.response?.data?.error || "Checkout failed. Please try again.");
        }
      } else {
        toast.error(errMsg || "Checkout failed. Please try again.");
      }
      setIsCheckingOut(false);
    }
  };

  return (
    <main
      className="min-h-screen bg-white py-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] text-[#252525]"
      style={{ fontFamily: "var(--font-sfpro)" }}
    >
      <div className="w-full max-w-[1224px] mx-auto">
        {/* Title */}
        <h1
          className="font-inter font-bold text-[32px] md:text-[40px] text-[#021165] mb-2"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          Shopping Cart
        </h1>

        {cartCount === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center text-center py-16 border-b border-gray-100 mb-12">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-10 h-10 text-[#042BFD] opacity-60" />
            </div>
            <h2 className="font-inter font-medium text-2xl text-[#021165] mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-500 max-w-md mb-8">
              Check out our selection of expert-led webinars and mentorship programs to accelerate your academic results.
            </p>
            <Link href="/courses">
              <Button variant="primary" className="!w-fit px-8">
                Explore Courses
              </Button>
            </Link>
          </div>
        ) : (
          /* Filled Cart: 2-Column Grid */
          <>
            <p className="font-semibold text-gray-700 text-sm mb-8">
              {cartCount} {cartCount === 1 ? "Course" : "Courses"} in Cart
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10 items-start pb-16 border-b border-gray-100 mb-12">
              {/* Left Column: Cart Items List */}
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-100 items-start sm:items-center justify-between"
                  >
                    {/* Image and Info */}
                    <div className="flex gap-4 flex-1 items-start sm:items-center">
                      <div className="relative w-28 h-16 sm:w-32 sm:h-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <Image
                          src={getImageUrl(item.thumbnail)}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-[15px] sm:text-[17px] text-[#021165] leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[12px] text-gray-500 mt-1">
                          By {item.educator || "Expert Mentor"}
                        </p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Star className="w-3.5 h-3.5 fill-[#E2E7FF] text-[#042BFD]" />
                          <span className="text-[12px] font-bold text-[#042BFD]">
                            {item.educatorRating || 4.8}
                          </span>
                          <span className="text-[11px] text-gray-400">
                            ({item.enrolledCount || 5} enrolled)
                          </span>
                        </div>
                        {/* Meta Info */}
                        <div className="flex gap-2 items-center text-[11px] text-gray-400 mt-1.5 flex-wrap">
                          <span className="bg-[#042BFD]/10 text-[#042BFD] px-1.5 py-0.5 rounded font-semibold text-[9px] uppercase">
                            Premium
                          </span>
                          <span>•</span>
                          <span>{item.duration || "Mentor-Led"}</span>
                          <span>•</span>
                          <span>All Levels</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Actions & Price */}
                    <div className="flex sm:flex-col items-end gap-3 justify-between w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
                      <span className="text-[18px] font-bold text-gray-900">
                        {item.cost === 0 ? "Free" : `₹${item.cost.toLocaleString()}`}
                      </span>
                      <div className="flex gap-3 text-xs">
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-500 hover:text-red-700 font-semibold cursor-pointer flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Checkout Summary Card */}
              <div className="bg-[#F8FAFF] rounded-[16px] border border-gray-100 p-6 space-y-6 sticky top-24">
                <div>
                  <p className="text-[14px] text-gray-500 font-medium mb-1">Total:</p>
                  <h2 className="text-[32px] font-bold text-[#021165]">
                    ₹{total.toLocaleString()}
                  </h2>
                  {discountAmount > 0 && (
                    <div className="flex gap-2 items-center mt-1">
                      <span className="line-through text-sm text-gray-400">
                        ₹{subtotal.toLocaleString()}
                      </span>
                      <span className="text-xs text-green-600 font-semibold">
                        Saved ₹{discountAmount.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Checkout Button */}
                <div className="space-y-3">
                  <Button
                    disabled={isCheckingOut}
                    onClick={handleCheckout}
                    className="w-full !h-[48px] text-[15px] font-semibold flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Enrolling...
                      </>
                    ) : (
                      <>
                        Proceed to Checkout
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                  <p className="text-center text-[12px] text-gray-400">
                    You won't be charged yet. Enrollment completes automatically.
                  </p>
                </div>

                {/* Coupon Code Section */}
                <div className="border-t border-gray-200 pt-6 space-y-3">
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-[#021165]">
                    <Tag className="w-4 h-4" />
                    Promotions
                  </div>

                  {appliedCoupon ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-bold text-green-800 uppercase">
                          {appliedCoupon}
                        </span>{" "}
                        applied
                      </div>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setDiscountAmount(0);
                        }}
                        className="text-red-500 font-semibold hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter Coupon"
                        className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#042BFD] focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 text-sm font-bold text-[#042BFD] border border-[#042BFD] rounded-lg hover:bg-[#042BFD] hover:text-white transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  <div className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                    Try <span className="font-semibold">freeyetzu</span> (100% off) or <span className="font-semibold">yetzu20</span> (20% off) for demo purposes.
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Explore More Courses (in a single row) */}
        {displayExploreCourses.length > 0 && (
          <div className="mt-16">
            <h2
              className="font-inter font-bold text-[24px] md:text-[30px] text-[#021165] mb-8"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              Explore More Courses
            </h2>
            {isCoursesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CourseCardSkeleton />
                <CourseCardSkeleton />
                <CourseCardSkeleton />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {displayExploreCourses.map((course) => (
                  <div key={course._id} className="h-full">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
