import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_TEST_TOKEN = "TqSxD9F3-ru7ZCt";

interface PaymentPayload {
  event: string;
  payload: {
    payment: {
      entity: {
        id: string;
        order_id: string;
        amount: number;
        currency: string;
        notes: {
          userId: string;
          sessionId: string;
        };
      };
    };
  };
}

interface EnrollmentRecord {
  id: string;
  userId: string;
  sessionId: string;
  orderId: string;
  amount: number;
  currency: string;
  enrolledAt: string;
  status: "enrolled" | "pending" | "failed";
}

const enrollments: Map<string, EnrollmentRecord> = new Map();

const generateEnrollmentId = (): string => `enroll_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export async function POST(request: NextRequest) {
  try {
    const webhookToken = request.headers.get("x-webhook-test-token");
    
    if (!webhookToken || webhookToken !== WEBHOOK_TEST_TOKEN) {
      console.error("[Payment Webhook] Invalid or missing webhook token");
      return NextResponse.json(
        { success: false, error: "Invalid webhook token" },
        { status: 401 }
      );
    }

    const body: PaymentPayload = await request.json();
    console.log("[Payment Webhook] Received webhook:", body);

    const { event, payload } = body;

    if (event !== "payment.captured") {
      console.log(`[Payment Webhook] Ignoring non-captured event: ${event}`);
      return NextResponse.json(
        { success: true, message: `Event ${event} ignored` },
        { status: 200 }
      );
    }

    const payment = payload?.payment?.entity;
    if (!payment) {
      console.error("[Payment Webhook] Missing payment entity");
      return NextResponse.json(
        { success: false, error: "Invalid payment payload" },
        { status: 400 }
      );
    }

    const { id: paymentId, order_id: orderId, amount, currency, notes } = payment;
    const { userId, sessionId } = notes || {};

    if (!userId || !sessionId) {
      console.error("[Payment Webhook] Missing userId or sessionId in notes");
      return NextResponse.json(
        { success: false, error: "Missing userId or sessionId in payment notes" },
        { status: 400 }
      );
    }

    const enrollmentId = generateEnrollmentId();
    const enrollment: EnrollmentRecord = {
      id: enrollmentId,
      userId,
      sessionId,
      orderId: orderId || paymentId,
      amount: amount / 100,
      currency: currency || "INR",
      enrolledAt: new Date().toISOString(),
      status: "enrolled",
    };

    enrollments.set(enrollmentId, enrollment);
    console.log(`[Payment Webhook] Enrollment created:`, enrollment);

    return NextResponse.json({
      success: true,
      message: "Enrollment created successfully",
      enrollment: {
        id: enrollmentId,
        userId,
        sessionId,
        orderId,
        amount: enrollment.amount,
        currency,
        enrolledAt: enrollment.enrolledAt,
        status: enrollment.status,
      },
    });
  } catch (error: any) {
    console.error("[Payment Webhook] Error processing webhook:", error);
    console.error("[Payment Webhook] Error message:", error?.message);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const allEnrollments = Array.from(enrollments.values());
  return NextResponse.json({
    success: true,
    count: allEnrollments.length,
    enrollments: allEnrollments,
  });
}