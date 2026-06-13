# Organizations Module PRD

## Overview
The Organizations module lets admins create, manage, and monitor client organizations in one flow. It covers the 6-step creation wizard, student import, access permissions, billing, activity tracking, and reporting dashboards.

## Goals
- Create an organization with admin contact, students, access permissions, and billing in a single flow.
- Automatically grant eligible access to imported students.
- Provide dashboard analytics for growth, revenue, alerts, and performance.
- Support list, detail, student, permissions, sessions, and billing views.

## Users
- Admin
- Operations team
- Finance team

## In Scope
- Organization create flow with 6 steps:
  - Organisation Info
  - Admin Contact
  - Student Import
  - Access & Permissions
  - Billing Setup
  - Review & Create
- Organization list and dashboard
- Organization detail overview
- Student management
- Access permission management
- Session visibility
- Billing and invoice management

## Out of Scope
- Public self-signup for organizations
- Manual course/session authoring inside the organization module
- Payment gateway checkout flow

## Core Data Model
- `organizations`
- `organization_admin_contacts`
- `students`
- `organization_students`
- `access_features`
- `organization_access_permissions`
- `courses`
- `sessions`
- `assignments`
- `student_course_enrollments`
- `student_session_access`
- `student_assignment_access`
- `invoices`
- `payments`
- `organization_activity_logs`

## Workflow
### Step 1: Organisation Info
Collect:
- `organisationName`
- `type`
- `emailDomain`
- `location`
- `description`

### Step 2: Admin Contact
Collect:
- `primaryContactName`
- `email`
- `phoneCode`
- `mobileNo`
- `roleTitle`

### Step 3: Student Import
Support:
- CSV upload
- XLS upload
- XLSX upload
- Manual student entry

Student fields:
- `name`
- `email`
- `password`
- `mobileNo`

Rules:
- Reject duplicate emails in payload and against existing students/users.
- Validate required fields before creation.
- Hash passwords before persisting.
- Save all students as part of the organization create transaction.

### Step 4: Access & Permissions
Feature access:
- Webinars
- Cohorts
- 1:1 Mentorship
- Certification Courses
- Assignments

Each permission includes:
- `enabled`
- `limit`
- `usedCount`
- `accessExpiry`

Rules:
- When a permission is enabled, existing active students receive the access automatically.
- If the feature maps to sessions, courses, or assignments, create the corresponding student access rows.

### Step 5: Billing Setup
Collect:
- `invoiceId`
- `amount`
- `currency`
- `invoiceDate`
- `paymentDate`
- `paymentMethod`
- `billingCycle`
- `planType`
- `paymentStatus`
- `nextBillingDate`

Supported payment methods:
- Bank Transfer
- Credit Card
- Wire Transfer
- Check
- Other

### Step 6: Review & Create
The create endpoint must persist:
- organization
- admin contact
- students
- access permissions
- invoice/payment record
- student access mappings
- activity log
- auto-enrollment records

## UI And Layout Notes
These notes capture the dashboard and billing UI requirements that are not obvious from the API shape alone.

### Overview Section
- Use the updated header layout from the design reference.
- Keep KPI cards with a smaller corner radius and no added shadow.
- Preserve the left/right padding specified in the design.
- The current plan card must support both `active` and `expired` states.
- On mobile, the overview should collapse section-by-section rather than compressing content into a single row.

### Invoices Section
- Clicking `View all invoices` should navigate to the invoices page.
- Invoice detail should open as an overlay that matches the design reference.
- Each invoice row/card should expose a download action backed by the invoice download API.
- Pending invoices should expose a `Pay` action that routes the user into the payment flow or payment gateway.

### Subscriptions Section
- The mentorship plan management flow should be documented as a backend + frontend integration.
- Cancelling a plan should follow the dedicated cancellation flow.
- Clicking subscription details should open the overlay view for the selected plan.
- Mobile presentation should mirror the design and not reuse the desktop section layout unchanged.

## API Contract
### Dashboard
- `GET /api/organizations/dashboard`

Returns:
- totalOrganizations
- activeOrganizations
- inactiveOrganizations
- suspendedOrganizations
- totalStudents
- activeStudents
- revenueFromOrganizations
- organizationGrowth
- studentGrowth
- alerts
- topOrganizationsByPerformance

### Organizations
- `GET /api/organizations`
- `POST /api/organizations`
- `GET /api/organizations/:id`
- `PUT /api/organizations/:id`
- `PATCH /api/organizations/:id/status`
- `DELETE /api/organizations/:id`

### Students
- `GET /api/organizations/:id/students`
- `POST /api/organizations/:id/students`
- `POST /api/organizations/:id/students/import`
- `PUT /api/organizations/:id/students/:studentId`
- `PATCH /api/organizations/:id/students/:studentId/status`

### Access Permissions
- `GET /api/organizations/:id/access-permissions`
- `PUT /api/organizations/:id/access-permissions`

### Sessions
- `GET /api/organizations/:id/sessions`

### Billing
- `GET /api/organizations/:id/billing`
- `POST /api/organizations/:id/billing/payments`
- `GET /api/organizations/:id/billing/invoices/:invoiceId/download`
- Billing summary returns the current plan snapshot, invoices, pending invoices, payments, and invoice summary counts.
- The current plan payload can represent active and expired states depending on subscription status and outstanding balance.
- Each invoice record includes a download URL and, where applicable, a payment URL for pending items.

## Acceptance Criteria
- Organization creation completes successfully in one atomic backend operation.
- Duplicate student emails are rejected.
- Imported students receive enabled access automatically.
- Dashboard metrics reflect current organization data.
- Organization detail page returns health, engagement, payment, and progress scores.
- Billing endpoints return invoices and payment history.

## API Notes
- All admin endpoints require `Authorization: Bearer <adminToken>`.
- CSV template columns must match the import parser exactly.
- XLS and XLSX import are supported through the same student import route.
