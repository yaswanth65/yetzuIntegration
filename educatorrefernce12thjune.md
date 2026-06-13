# Educator API Reference

This document covers the educator-facing APIs in the repo, including the small helper routes used by the dashboard, assignments, session files, submission review, tickets, and reschedule flows.

## Common Auth

Most educator routes require:

- `Authorization: Bearer <educatorToken>`
- `x-user-id: <educatorUserId>`

Common responses:

- `401` missing or invalid token
- `400` missing `x-user-id`
- `403` token user mismatch or non-educator access

## Dashboard

### `POST /api/educator/overview`

Returns educator KPI cards, sessions, assignments, submissions, tickets, student activity, and alerts.

Key response groups:

- `cards`
- `stats`
- `userDetails`
- `activeStudent`
- `pending`
- `assignments`
- `tickets`
- `session`
- `sessions`
- `alerts`

KPI fields:

- `scheduledSessions`
- `pendingAssignments`
- `mySessions`
- `assignmentsCreated`
- `activeStudents`
- `hoursTaught`

### `POST /api/educator/my-session`

Returns educator session summary with upcoming sessions and past completed sessions.

### `GET /api/educator/dashboard/notifications`

Returns educator notifications for:

- assignment due soon
- today sessions
- upcoming sessions
- pending submissions
- support tickets
- reschedule requests
- messages

## Sessions

### `GET /api/educator/sessions`

Returns educator sessions with pagination-style metadata.

Query params:

- `status`
- `search`
- `view=calendar`
- `page`
- `limit`

### `GET /api/educator/sessions/[id]`

Returns full session detail.

Includes:

- session metadata
- `studentDetails`
- `assignmentDetails`
- `rescheduleRequests`
- session stats
- `chatType`

### `PUT /api/educator/sessions/[id]`

Updates session:

- `notes`
- `status`
- `sessionLink`

### `GET /api/educator/sessions/[id]/files`

Returns session resources.

### `POST /api/educator/sessions/[id]/files`

Uploads one or more resources to a session.

Content type:

- `multipart/form-data`

Fields:

- `file` or `resource` required
- `title` optional
- `description` optional

### `PUT /api/educator/sessions/[id]/files`

Updates a session resource.

Fields:

- `resourceId` required
- `title` optional
- `description` optional
- `file` optional for replace

### `PATCH /api/educator/sessions/[id]/files`

Alias for update resource.

### `DELETE /api/educator/sessions/[id]/files?resourceId=...`

Deletes one or more resources.

You can pass:

- a single `resourceId`
- or comma-separated `resourceId` values

Resource shape:

- `id`
- `resourceId`
- `type`
- `title`
- `description`
- `fileName`
- `filePath`
- `fileUrl`
- `mimeType`
- `size`
- `educatorId`
- `sessionId`
- `uploadedAt`

## Session Picker Helper

### `GET /api/educator/assignments/session-options`

Returns sessions that can be used while creating assignments.

Query params:

- `search`
- `status`
- `onlyAssignable` default `true`
- `includeAll` default `false`

## Assignments

### `GET /api/educator/assignments`

Returns all educator assignments with course, session, assigned students, submissions, and summary counts.

Query params:

- `search`
- `status`
- `courseId`
- `sessionId`

### `GET /api/educator/assignments/[id]`

Returns assignment detail.

Includes:

- `course`
- `session`
- `assignedStudents`
- `submissions`

### `POST /api/educator/assignments/create`

Creates an assignment for a session or course.

Content type:

- `multipart/form-data`

Required fields:

- `title`
- `dueDate`
- one of `sessionId` or `courseId`

Optional fields:

- `description`
- `assignedStudents`
- `file`

Notes:

- If `assignedStudents` is omitted, all enrolled students are used.
- The API seeds `assignment_submissions` rows in `pending` state for the assigned students.

### `GET /api/educator/assignments/list`

Returns assignment rows with assignment and submission summaries.

Query params:

- `courseId` optional
- `sessionId` optional
- `status` optional
- `search` optional

### `GET /api/educator/assignments/submissions`

Returns educator submission list with pagination and filters.

Query params:

- `page`
- `limit`
- `status`
- `assignmentId`
- `sessionId`
- `studentId`
- `search`

### `GET /api/educator/assignments/submissions/[id]`

Returns submission detail including:

- `assignment`
- `student`
- `course`
- `session`
- `canReview`

### `PATCH /api/educator/assignments/submissions/[id]`

Updates submission feedback.

Body:

- `status` optional
- `educatorRemark` optional
- `feedbackUrl` optional

### `GET /api/educator/assignments/feedback`

Not implemented as GET.

### `POST /api/educator/assignments/feedback`

Adds feedback text to a submission tied to an assignment.

Body:

- `assignmentId`
- `text`

### `POST /api/educator/submissions/review`

Reviews a submission and updates its status.

Body:

- `submissionId`
- `status`
- `educatorRemark` optional

Allowed status values:

- `pending`
- `submitted`
- `reviewed`
- `approved`
- `rejected`

## Tickets

### `POST /api/educator/tickets`

Creates a support ticket from educator side.

Body:

- `subject`
- `description`

Optional:

- `priority`
- `status`
- `category`
- `sessionId`
- `assignmentId`
- `studentId`
- `metadata`

## Reschedule

### `POST /api/educator/reschedule-action`

Reviews a student-to-educator reschedule request for a 1:1 mentorship session.

Body:

- `sessionId`
- `requestId`
- `action` one of `approved` or `rejected`
- `educatorRemark` optional

### `POST /api/educator/session/reschedule-request`

Creates an educator-to-student reschedule request for a 1:1 mentorship session.

Body:

- `sessionId`
- `proposedDate`
- `reason`
- `proposedTime` optional
- `studentId` optional

Validation:

- `proposedDate` must be in the future
- session must be a 1:1 mentorship session

## Helpful Response Fields

### Session records

- `sessionTypeLabel`
- `status`
- `startDateTime`
- `endDateTime`
- `sessionLink`
- `resources`
- `assignments`

### Assignment records

- `submissionStats.totalAssigned`
- `submissionStats.totalSubmitted`
- `submissionStats.totalReviewed`
- `submissionStats.totalPending`
- `studentStatuses`

### Submission records

- `submitted_doc`
- `submitted_url`
- `feedbackUrl`
- `educatorRemark`
- `reviewedAt`

## Notes

- Session status is derived from both date and time, not date alone.
- Session type labels are normalized to friendly values like `Webinar`, `Cohort`, and `1:1`.
- Student submissions now preserve the original uploaded filename in `submitted_doc`.
- Educator-created tickets now include the sender user details in `from`/`raisedByUser` where available.
