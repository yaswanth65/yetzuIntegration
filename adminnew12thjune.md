# Admin API Reference

Base URLs:

- `https://your-domain.com/api/admin/...`
- `https://your-domain.com/api/organizations/...` for organization management aliases

Auth:

- Admin routes require `Authorization: Bearer <ADMIN_JWT>`
- Most JSON endpoints also require `Content-Type: application/json`
- Multipart upload endpoints use `multipart/form-data`

## Common Headers

```bash
Authorization: Bearer <ADMIN_JWT>
Content-Type: application/json
```

## Overview

### `GET /api/admin/overview`
Returns admin dashboard cards, recent sessions, recent tickets, alerts, activity feed, and organization overview.

```bash
curl 'https://your-domain.com/api/admin/overview' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `GET /api/admin/dashboard/notifications`
Returns admin dashboard notifications and summary.

```bash
curl 'https://your-domain.com/api/admin/dashboard/notifications' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `GET /api/admin/activity`
Returns activity feed items.

```bash
curl 'https://your-domain.com/api/admin/activity' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `GET /api/admin/analytics`
Returns analytics metrics, user growth, revenue charts, activity feed, engagement stats, and tickets.

Query params:
- `rangeDays`
- `days`
- `range`

```bash
curl 'https://your-domain.com/api/admin/analytics?rangeDays=30' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `GET /api/admin/analytics/export`
Exports analytics as CSV by default. Use `format=json` to return the same payload as JSON.

Query params:
- `rangeDays`
- `days`
- `range`
- `format`

```bash
curl -L 'https://your-domain.com/api/admin/analytics/export?rangeDays=30' \
  -H 'authorization: Bearer <ADMIN_JWT>' \
  -o analytics-report.csv
```

```bash
curl 'https://your-domain.com/api/admin/analytics/export?rangeDays=30&format=json' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

Analytics response shape includes:
- `overview`
- `charts.userGrowth`
- `charts.revenue`
- `charts.revenueBreakdown`
- `charts.assignmentPerformance`
- `activityFeed`
- `engagement`
- `tickets`

Overview admin already includes:
- `liveActivityFeed`
- `revenueBreakdown`

## Users

### `GET /api/admin/users`
Query params: `page`, `limit`, `search`, `role`, `status`, `organizationId`, `includeDeleted`

```bash
curl 'https://your-domain.com/api/admin/users?page=1&limit=10&search=student' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `POST /api/admin/users`
Creates a student or educator.

```json
{
  "name": "Test Student",
  "email": "student@example.com",
  "password": "Temp@1234",
  "mobileno": "9999999999",
  "role": "student",
  "status": "active",
  "organizationId": "<ORG_UUID>",
  "inviteMethod": "temp_password",
  "sendCredentialsEmail": true
}
```

```bash
curl 'https://your-domain.com/api/admin/users' \
  -X POST \
  -H 'authorization: Bearer <ADMIN_JWT>' \
  -H 'content-type: application/json' \
  --data-raw '{ ... }'
```

### `GET /api/admin/users/:id`
Returns full user detail, engagement overview, sessions, assignments, notifications summary, and available actions.

```bash
curl 'https://your-domain.com/api/admin/users/<USER_UUID>' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `PUT /api/admin/users/:id`
Updates profile and metadata.

```json
{
  "name": "Updated Name",
  "mobileno": "8888888888",
  "status": "active",
  "organizationId": "<ORG_UUID>"
}
```

```bash
curl 'https://your-domain.com/api/admin/users/<USER_UUID>' \
  -X PUT \
  -H 'authorization: Bearer <ADMIN_JWT>' \
  -H 'content-type: application/json' \
  --data-raw '{ ... }'
```

### `PATCH /api/admin/users/:id`
Used for status changes in the detail route.

```json
{
  "status": "suspended"
}
```

### `POST /api/admin/users/:id/sessions`
Assigns existing sessions to a user.

```json
{
  "sessionIds": ["<SESSION_UUID_1>", "<SESSION_UUID_2>"]
}
```

### `GET /api/admin/users/:id/notifications`
Returns the user notification panel payload.

```bash
curl 'https://your-domain.com/api/admin/users/<USER_UUID>/notifications' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

## Sessions

### `GET /api/admin/sessions`
Query params: `page`, `limit`, `search`, `status`, `sessionType`, `educatorId`, `organizationId`, `view`

```bash
curl 'https://your-domain.com/api/admin/sessions?page=1&limit=10' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `POST /api/admin/sessions`
Creates a session.

```json
{
  "title": "Webinar Session",
  "description": "Session description",
  "sessionType": "webinar",
  "category": "writing",
  "educatorId": "<EDUCATOR_UUID>",
  "date": "2026-06-10",
  "startTime": "10:00",
  "endTime": "11:00",
  "price": 499,
  "status": "upcoming"
}
```

### `GET /api/admin/sessions/:id`
Returns full session details.

### `PUT /api/admin/sessions/:id`
Updates session details.

### `DELETE /api/admin/sessions/:id`
Deletes a session.

## Assignments

### `GET /api/admin/assignments`
Query params: `page`, `limit`, `search`, `status`, `courseId`, `sessionId`, `educatorId`

```bash
curl 'https://your-domain.com/api/admin/assignments?page=1&limit=10' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `POST /api/admin/assignments/create`
Creates an assignment. Alias for the assignments create route.

```json
{
  "title": "Essay Draft",
  "description": "Submit first draft",
  "sessionId": "<SESSION_UUID>",
  "dueDate": "2026-06-15T18:00:00.000Z",
  "assignedStudents": ["<STUDENT_UUID>"]
}
```

### `GET /api/admin/assignments/:id`
Returns assignment detail.

### `PUT /api/admin/assignments/:id`
Updates assignment detail.

### `DELETE /api/admin/assignments/:id`
Deletes an assignment.

## Blogs

### `GET /api/admin/blogs`
Query params: `page`, `limit`, `search`, `status`

### `POST /api/admin/blogs`
Creates a blog post.

```json
{
  "title": "New Blog Post",
  "content": "Blog content here",
  "status": "draft"
}
```

### `GET /api/admin/blogs/:id`
Returns blog detail.

### `PUT /api/admin/blogs/:id`
Updates blog detail.

### `DELETE /api/admin/blogs/:id`
Deletes a blog.

## CMS

CMS endpoints are admin-protected and live under `/api/cms`.

### `GET /api/cms/pages`
Returns all CMS page documents. If the database is empty, default seed pages are returned.

```bash
curl 'https://your-domain.com/api/cms/pages' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `GET /api/cms/pages/:pageKey`
Returns a single CMS page document with all sections.

```bash
curl 'https://your-domain.com/api/cms/pages/home' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `PUT /api/cms/pages/:pageKey`
Updates page-level CMS metadata.

```json
{
  "pageTitle": "Homepage",
  "status": "active",
  "sortOrder": 1,
  "metadata": {
    "theme": "modern"
  }
}
```

### `GET /api/cms/pages/:pageKey/sections/:sectionKey`
Returns a single section document.

```bash
curl 'https://your-domain.com/api/cms/pages/home/sections/hero' \
  -H 'authorization: Bearer <ADMIN_JWT>'
```

### `PUT /api/cms/pages/:pageKey/sections/:sectionKey`
Updates a CMS section.

```json
{
  "sectionTitle": "Hero Banner",
  "sortOrder": 0,
  "metadata": {
    "layout": "full"
  },
  "data": {
    "title": "Welcome",
    "subtitle": "Build with confidence"
  }
}
```

### `POST /api/cms/media`
Uploads an image asset for CMS use.

```bash
curl 'https://your-domain.com/api/cms/media' \
  -X POST \
  -H 'authorization: Bearer <ADMIN_JWT>' \
  -F 'file=@hero.png' \
  -F 'title=Homepage Hero' \
  -F 'altText=Homepage hero banner'
```

## Coupons

### `GET /api/admin/coupons`
Query params: `page`, `limit`, `search`, `status`, `type`

### `POST /api/admin/coupons`
Creates a coupon.

```json
{
  "name": "Summer Discount",
  "type": "discount",
  "discountType": "percentage",
  "discountValue": 20,
  "maxUses": 100,
  "status": "active"
}
```

### `GET /api/admin/coupons/:id`
Returns coupon detail.

### `PUT /api/admin/coupons/:id`
Updates coupon detail.

### `DELETE /api/admin/coupons/:id`
Deletes a coupon.

## Tickets

### `GET /api/admin/tickets`
Query params: `page`, `limit`, `search`, `status`, `priority`

### `POST /api/admin/tickets`
Creates a support ticket.

```json
{
  "subject": "Payment issue",
  "description": "User reported payment issue",
  "priority": "medium",
  "status": "open"
}
```

### `GET /api/admin/tickets/:id`
Returns ticket detail.

### `PUT /api/admin/tickets/:id`
Updates ticket detail.

### `DELETE /api/admin/tickets/:id`
Deletes a ticket.

## Contacts

### `GET /api/admin/contacts`
Returns contact submissions.

### `POST /api/admin/contacts`
Creates a contact record.

```json
{
  "name": "User Name",
  "email": "user@example.com",
  "subject": "Admission query",
  "mobile": "9999999999",
  "medical_school_affiliation": "MIT ADT",
  "description": "I need help with admission"
}
```

### `GET /api/admin/contacts/:id`
Returns contact detail.

### `DELETE /api/admin/contacts/:id`
Soft deletes a contact.

### `POST /api/admin/contacts/:id/reply`
Sends a direct email reply to the contact and stores reply metadata.

```json
{
  "replySubject": "Re: Admission query",
  "replyMessage": "Hi, thanks for reaching out. Here is the answer..."
}
```

## Organizations

Admin aliases:

- `GET /api/admin/organizations`
- `POST /api/admin/organizations`
- `GET /api/admin/organizations/:id`
- `PUT /api/admin/organizations/:id`
- `DELETE /api/admin/organizations/:id`

Public/admin shared aliases:

- `GET /api/organizations`
- `GET /api/organizations/:id`
- `GET /api/organizations/dashboard`
- `GET /api/organizations/:id/:path...`

### `POST /api/admin/organizations`
Creates an organization and its initial students/admin contact.

```json
{
  "organizationName": "ABC Institute",
  "type": "institution",
  "email": "admin@abc.edu",
  "accessPlan": "basic",
  "billingCycle": "monthly",
  "billingPlanType": "seat-based",
  "pricePerStudent": 80,
  "totalSeats": 300,
  "paymentMethod": "credit_card",
  "estimatedTotal": 24000,
  "currency": "USD",
  "limits": {
    "webinars": 10,
    "cohorts": 5,
    "mentorship": 2,
    "certification_courses": 3,
    "assignments": 20
  },
  "students": [
    {
      "name": "Student A",
      "email": "studenta@example.com",
      "password": "Temp@1234"
    }
  ]
}
```

### `GET /api/admin/organizations/:id`
Returns organization detail, admin contact, permissions, students, sessions, invoices, payments, and health metrics.

### `PUT /api/admin/organizations/:id`
Updates organization basic data and billing snapshot.

### `DELETE /api/admin/organizations/:id`
Permanently deletes the organization and inactivates linked student accounts.

### Nested organization routes

#### `GET /api/organizations/:id/students`
List organization students.

#### `POST /api/organizations/:id/students`
Create a student manually under the organization.

#### `POST /api/organizations/:id/students/import`
Import students from Excel or JSON array payload.

#### `PUT /api/organizations/:id/students/:studentId`
Update a student under the organization.

#### `PATCH /api/organizations/:id/students/:studentId/status`
Update student status.

#### `GET /api/organizations/:id/access-permissions`
Get feature access permissions.

#### `PUT /api/organizations/:id/access-permissions`
Update permissions.

#### `GET /api/organizations/:id/limits`
Get org limits.

#### `PUT /api/organizations/:id/limits`
Update org limits.

#### `GET /api/organizations/:id/sessions`
List org sessions with enrolled students expanded.

#### `POST /api/organizations/:id/sessions`
Enroll selected students into selected sessions.

#### `GET /api/organizations/:id/billing`
Billing summary.
Returns the organization billing snapshot, including:
- `currentPlan`
- `invoiceSummary`
- `invoices`
- `pendingInvoices`
- `payments`

Invoice records include a `downloadUrl`, and pending invoices may also include a payment action URL.

#### `POST /api/organizations/:id/billing/payments`
Record a payment.

#### `POST|PATCH /api/organizations/:id/billing/payments/:paymentId`
Mark a payment as completed.

#### `GET /api/organizations/:id/billing/invoices/:invoiceId/download`
Downloads invoice PDF.

#### `POST /api/organizations/:id/suspend`
Suspends the organization.

#### `POST /api/organizations/:id/resume`
Resumes the organization.

#### `PATCH /api/organizations/:id/status`
Updates organization status directly.

## Notes on ID formats

Readable IDs now follow these tags:

- `STU-xxxxx`
- `EDU-xxxxx`
- `ORG-xxxxx`
- `WEB-xxxxx`
- `COH-xxxxx`
- `MNT-xxxxx`
- `CER-xxxxx`
- `TKT-xxxxx`
- `CNT-xxxxx`
- `CPN-xxxxx`
- `BLG-xxxxx`
- `INV-YYYY-xxxxx`
- `TXN-YYYY-xxxxx`

## Problem Summary

The admin module needed three things:

1. A direct email reply flow for contact submissions.
2. Hard enforcement so students from suspended or deleted organizations cannot sign in or continue accessing student APIs.
3. Cleaner readable IDs across admin-managed entities.

The backend now covers those concerns, and the collection below mirrors the same routes.
