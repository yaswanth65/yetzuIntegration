#!/usr/bin/env node

const TEST_WEBHOOK_URL = "http://localhost:3000/api/payment/webhook";
const WEBHOOK_TOKEN = "TqSxD9F3-ru7ZCt";

const testPaymentWebhook = async () => {
  console.log("=".repeat(60));
  console.log("Testing Payment Webhook API");
  console.log("=".repeat(60));

  const testPayload = {
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_" + Math.random().toString(36).substr(2, 12),
          order_id: "order_" + Math.random().toString(36).substr(2, 12),
          amount: 49900,
          currency: "INR",
          notes: {
            userId: "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa",
            sessionId: "81111111-1111-4111-8111-111111111111"
          }
        }
      }
    }
  };

  console.log("\n1. Testing with valid token...");
  console.log("   Payload:", JSON.stringify(testPayload, null, 2));

  try {
    const response = await fetch(TEST_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-test-token": WEBHOOK_TOKEN
      },
      body: JSON.stringify(testPayload)
    });

    const data = await response.json();
    console.log("   Status:", response.status);
    console.log("   Response:", JSON.stringify(data, null, 2));

    if (response.ok && data.success) {
      console.log("   ✅ Test PASSED - Enrollment created successfully");
    } else {
      console.log("   ❌ Test FAILED");
    }
  } catch (error) {
    console.error("   ❌ Error:", error.message);
  }

  console.log("\n2. Testing with invalid token...");
  try {
    const response = await fetch(TEST_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-test-token": "invalid-token"
      },
      body: JSON.stringify(testPayload)
    });

    const data = await response.json();
    console.log("   Status:", response.status);
    console.log("   Response:", JSON.stringify(data, null, 2));

    if (response.status === 401) {
      console.log("   ✅ Test PASSED - Invalid token rejected");
    } else {
      console.log("   ❌ Test FAILED - Expected 401");
    }
  } catch (error) {
    console.error("   ❌ Error:", error.message);
  }

  console.log("\n3. Testing with missing userId/sessionId...");
  const invalidPayload = {
    event: "payment.captured",
    payload: {
      payment: {
        entity: {
          id: "pay_test123",
          order_id: "order_test123",
          amount: 49900,
          currency: "INR",
          notes: {}
        }
      }
    }
  };

  try {
    const response = await fetch(TEST_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-test-token": WEBHOOK_TOKEN
      },
      body: JSON.stringify(invalidPayload)
    });

    const data = await response.json();
    console.log("   Status:", response.status);
    console.log("   Response:", JSON.stringify(data, null, 2));

    if (response.status === 400) {
      console.log("   ✅ Test PASSED - Missing userId/sessionId rejected");
    } else {
      console.log("   ❌ Test FAILED - Expected 400");
    }
  } catch (error) {
    console.error("   ❌ Error:", error.message);
  }

  console.log("\n4. Testing non-captured event...");
  const nonCapturedPayload = {
    event: "payment.failed",
    payload: {
      payment: {
        entity: {
          id: "pay_failed123",
          order_id: "order_failed123",
          amount: 49900,
          currency: "INR",
          notes: {
            userId: "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa",
            sessionId: "81111111-1111-4111-8111-111111111111"
          }
        }
      }
    }
  };

  try {
    const response = await fetch(TEST_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-webhook-test-token": WEBHOOK_TOKEN
      },
      body: JSON.stringify(nonCapturedPayload)
    });

    const data = await response.json();
    console.log("   Status:", response.status);
    console.log("   Response:", JSON.stringify(data, null, 2));

    if (response.ok) {
      console.log("   ✅ Test PASSED - Non-captured event handled gracefully");
    } else {
      console.log("   ❌ Test FAILED");
    }
  } catch (error) {
    console.error("   ❌ Error:", error.message);
  }

  console.log("\n5. Testing GET endpoint (list all enrollments)...");
  try {
    const response = await fetch(TEST_WEBHOOK_URL, {
      method: "GET"
    });

    const data = await response.json();
    console.log("   Status:", response.status);
    console.log("   Response:", JSON.stringify(data, null, 2));

    if (response.ok && data.count !== undefined) {
      console.log("   ✅ Test PASSED - Enrollment list retrieved");
    } else {
      console.log("   ❌ Test FAILED");
    }
  } catch (error) {
    console.error("   ❌ Error:", error.message);
  }

  console.log("\n" + "=".repeat(60));
  console.log("All tests completed!");
  console.log("=".repeat(60));
};

testPaymentWebhook();