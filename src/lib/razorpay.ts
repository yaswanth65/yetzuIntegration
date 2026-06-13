export function loadRazorpay(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof (window as any).Razorpay !== "undefined") {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
    document.body.appendChild(script);
  });
}

export function openRazorpayCheckout(params: {
  keyId: string;
  orderId: string;
  amount: number;
  currency?: string;
  title: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  onSuccess: (paymentId: string, orderId: string, signature: string) => void;
  onDismiss?: () => void;
}) {
  const options = {
    key: params.keyId,
    amount: params.amount * 100,
    currency: params.currency || "INR",
    name: "Yetzu",
    description: params.title,
    order_id: params.orderId,
    handler: (response: any) => {
      params.onSuccess(
        response.razorpay_payment_id,
        response.razorpay_order_id,
        response.razorpay_signature
      );
    },
    prefill: {
      name: params.userName || "",
      email: params.userEmail || "",
      contact: params.userPhone || "",
    },
    theme: { color: "#042BFD" },
    modal: {
      ondismiss: () => params.onDismiss?.(),
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
}
