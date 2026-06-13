# Student Session Enrollment And Razorpay Guide

This document explains how a student enrolls in a paid session, how single-session and multi-session checkout works, and which APIs are involved end to end.

## What this flow does

The student enrollment flow is based on the `sessions` table and the Razorpay payment APIs.

When a student pays successfully:
- the session is added to `users.enrolledCourses`
- the payment is stored in `users.paymentHistory`
- the student gets a meeting record in `users.meetings`
- the session row is updated with the student in `sessions.student_ids`
- `sessions.students_count` is incremented
- if the session has no valid Meet link, the backend can generate one

The main payment entry point is:
- [`POST /api/payment/order`](../src/pages/api/payment/order.js)

The payment completion listener is:
- [`POST /api/payment/webhook`](../src/pages/api/payment/webhook.js)

## Recommended APIs for the frontend

### 1. Load the session details

Use one of these before checkout:
- [`GET /api/public/sessions/[id]`](../src/pages/api/public/sessions/[id].js)
- [`GET /api/student/session/[id]`](../src/pages/api/student/session/[id].js)

Use the public API when the user is browsing the catalog and is not enrolled yet.
Use the student API when the user is already authenticated and enrolled.

Important fields returned by the session detail:
- `id`
- `title`
- `description`
- `sessionType`
- `price`
- `finalPrice`
- `status`
- `educatorId`
- `studentIds`
- `sessionLink`

### 2. Create the Razorpay order

Use:
- [`POST /api/payment/order`](../src/pages/api/payment/order.js)

This is the main API for both single enrollment and multiple enrollment.

The backend expects:
- `Authorization: Bearer <studentToken>`
- `x-user-id: <studentUserId>` or `userId` in the body

The request body supports:
- `sessionId` for one session
- `sessionIds` for multiple sessions
- `amount`
- `currency`
- `userId`

The backend validates:
- the token belongs to the same student
- the student exists
- the student role is `student`
- all requested sessions exist
- every requested session is payable
- the amount matches the server-calculated total
- the student is not already enrolled in any requested session

### 3. Confirm enrollment with Razorpay webhook

Use:
- [`POST /api/payment/webhook`](../src/pages/api/payment/webhook.js)

This is the server-to-server callback that finalizes enrollment after payment is captured.

The webhook:
- verifies the Razorpay signature
- reads `userId` and `sessionIds` from payment notes
- updates the student record
- updates the session record
- stores payment history
- creates meeting records
- generates a Google Meet link if needed

### 4. Verify the enrollment in student APIs

After payment succeeds, refresh:
- [`GET /api/student/courses/enrolled`](../src/pages/api/student/courses/enrolled.js)
- [`GET /api/student/dashboard/overview`](../src/pages/api/student/dashboard/overview.js)

These endpoints show the updated enrolled sessions, upcoming sessions, progress, and payment-related dashboard information.

## Single session enrollment

Use this when the student wants to buy one session only.

### Request

`POST /api/payment/order`

```json
{
  "sessionId": "81111111-1111-4111-8111-111111111111",
  "amount": 1499,
  "currency": "INR",
  "userId": "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa"
}
```

### What happens in the backend

The backend:
- converts `sessionId` to a one-item `sessionIds` array
- fetches the session from `sessions`
- calculates the payable amount from `price` or `final_price`
- creates a Razorpay order
- stores a `created` record in `users.paymentHistory`
- returns `orderId`, `keyId`, checkout data, and the target session details

### Successful response includes

- `orderId`
- `keyId`
- `amount`
- `currency`
- `sessionId`
- `sessionIds`
- `targetType: "session"`
- `checkout.orderId`
- `checkout.notes`

### After Razorpay payment capture

The frontend should wait for Razorpay success and let the webhook finalize the enrollment.

The webhook will:
- add the student to the session
- create/update the payment history entry with `status: "captured"`
- add the session to the student's `enrolledCourses`

## Multiple session enrollment

Use this when the student wants to purchase more than one session in the same checkout.

### Request

`POST /api/payment/order`

```json
{
  "sessionIds": [
    "81111111-1111-4111-8111-111111111111",
    "91111111-1111-4111-8111-111111111111"
  ],
  "amount": 2998,
  "currency": "INR",
  "userId": "aaaaaaaa-1111-4111-8111-aaaaaaaaaaaa"
}
```

### What happens in the backend

The backend treats this as a bulk checkout:
- all session IDs are normalized and deduplicated
- every session is checked for availability and price
- the total amount is calculated server-side
- Razorpay order is created for the combined amount
- payment history is stored with `targetType: "bulk_session"`
- the webhook later enrolls the student into each paid session

### Successful response includes

- `orderId`
- `sessionIds`
- `targetType: "bulk_session"`
- `target.title` like `Bulk session purchase (2)`
- `checkout.notes.sessionIds`

### After webhook capture

The webhook loops through every session in the list:
- valid sessions are enrolled
- missing sessions are skipped
- each valid session gets its own enrollment record and meeting record

## Important validation rules

The payment order API rejects the request if:
- the token is missing
- the token does not belong to the same student
- the user is not a student
- `sessionId` and `sessionIds` are both missing
- one of the sessions does not exist
- one of the sessions is not upcoming or live
- one of the sessions has no payable price
- the student is already enrolled in one of the requested sessions
- the client amount does not match the server amount

## Razorpay integration steps on the frontend

1. Fetch the session or sessions the student wants to buy.
2. Call `POST /api/payment/order` with one `sessionId` or multiple `sessionIds`.
3. Receive the Razorpay `orderId`, `keyId`, and checkout notes.
4. Open Razorpay Checkout on the frontend using those values.
5. On successful payment, let the backend webhook receive the captured event.
6. Refresh the student dashboard or enrolled sessions page.

## What to send in Razorpay notes

The backend already sets the important fields in Razorpay notes:
- `userId`
- `sessionId`
- `sessionIds`
- `sessionCount`
- `targetType`
- `amount`
- `currency`
- `title`

This is important because the webhook uses those notes to finalize enrollment.

## Student verification APIs after payment

After checkout, the student can verify the result with:
- [`GET /api/student/courses/enrolled`](../src/pages/api/student/courses/enrolled.js)
- [`GET /api/student/dashboard/overview`](../src/pages/api/student/dashboard/overview.js)
- [`GET /api/student/session/[id]`](../src/pages/api/student/session/[id].js)
- [`GET /api/student/invoices/[id]/download`](../src/pages/api/student/invoices/[id]/download.js)

## Legacy fallback

There is also a legacy course enrollment route:
- [`POST /api/course/v1/enrollcourse`](../src/pages/api/course/v1/enrollcourse.js)

That route is older and course-model based. For the current paid session flow, use `POST /api/payment/order` plus `POST /api/payment/webhook`.

## Suggested frontend rule

Use one checkout path for both:
- single enrollment: `sessionId`
- multiple enrollment: `sessionIds`

This keeps the UI simple and lets the backend enforce the pricing and enrollment rules consistently.


