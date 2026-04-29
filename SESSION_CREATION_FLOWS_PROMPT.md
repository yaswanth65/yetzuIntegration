# Session Creation & Management Flows - Detailed Prompt for AJA Agent

## Overview
This document provides comprehensive, flow-based instructions for creating and managing sessions in the Yetzu educational platform. The platform has three distinct user roles: Admin, Educator, and Student, each with their own dashboard and permissions. The session creation process MUST be designed to handle all three roles with appropriate flows, validations, and UI/UX patterns that match the existing codebase structure.

---

## 1. UNDERSTANDING THE CURRENT CODEBASE STRUCTURE

### 1.1 Route Structure (per exploration)
The platform uses Next.js App Router with the following route patterns:
- **Admin routes**: `/a/*` (e.g., `/a/dashboard`, `/a/sessions`, `/a/users`)
- **Educator routes**: `/e/*` (e.g., `/e/dashboard`, `/e/sessions`, `/e/assignments`)
- **Student routes**: `/s/*` (e.g., `/s/dashboard`, `/s/sessions`, `/s/assignments`)
- **Public routes**: `/courses`, `/assignments`, `/about`, etc.

### 1.2 Data Models and Types

#### Session Type (from `/src/app/(admindash)/types/SessionType.ts`)
```typescript
export type Type = "Webinar" | "Cohort" | "1:1" | "Workshop";
export type Status = "Live" | "Scheduled" | "Completed" | "Missed";
export type Tab = "All" | "Upcoming" | "Completed" | "Missed";
export type ViewMode = "list" | 'calender'

export interface Session {
    id: string;
    type: Type;
    educator: string;
    students: number,
    date: string;
    status: Status;
}
```

Note: The Session type has been extended with additional fields in the API response:
- `title`: Session title
- `sessionType`: Type of session (Webinar, Cohort, Workshop, Mentorship)
- `educatorId`: ID of the assigned educator
- `educatorName`: Display name of educator
- `students`: Can be either a number (count) or an array of student objects
- `date`, `scheduledDate`, `startDateTime`: Date fields
- `status`: Scheduled, Live, Completed, Missed
- `sessionId`: Alternative ID field
- `attendees`, `enrolledCount`: Alternative student count fields

#### User Type
Users in the system have roles:
- `role: "admin" | "educator" | "student" | "superadmin"`

#### Assignment Type (from educator perspective)
```typescript
export interface Assignment {
  id: string;
  assignmentId: string;
  sessionTitle: string;
  studentName: string;
  sessionType: SessionType;
  dueDate: string;
  status: "Pending" | "Submitted" | "Review Done";
  submissionDate: string;
  hasDownload: boolean;
}
```

### 1.3 API Endpoints

#### Admin API (in `/src/lib/api.ts`)
- `GET /api/admin/sessions` - Get all sessions (with filters: search, status, page, limit)
- `POST /api/admin/sessions` - Create new session
- `PUT /api/admin/sessions/:sessionId` - Update session
- `DELETE /api/admin/sessions/:sessionId` - Delete session
- `GET /api/admin/users` - Get all users (with filters: search, role, status, page, limit)
- `POST /api/admin/users` - Create new user
- `PUT /api/admin/users/:userId` - Update user
- `DELETE /api/admin/users/:userId` - Delete user
- `GET /api/admin/overview` - Get admin dashboard overview

#### Educator API
- `GET /api/educator/sessions` - Get educator's sessions
- `POST /api/educator/assignments/create` - Create assignment
- `POST /api/educator/assignments/list` - Get assignments list

#### Student API
- `GET /api/assignment/studentList` - Get student's assignments
- `POST /api/student/assignments/submit` - Submit assignment

### 1.4 Key Components to Reference

#### Admin Components
- `CreateSession.tsx` - Session creation wizard (in `/src/app/(admindash)/a/sessions/components/CreateSession.tsx`)
- `SessionTable.tsx` - Session list display
- `CalendarView.tsx` - Calendar view
- `AllSessions.tsx` - Main sessions page wrapper
- `SessionDetailsPanel.tsx` - Session details drawer

#### Educator Components
- `AssignmentsTable.tsx` - For listing assignments
- `SessionDetailsDrawer.tsx` - Session details in drawer

#### Student Components
- `AssignmentsTable.tsx` - Student assignment view
- `UploadAssignmentModal.tsx` - File upload modal with validation

### 1.5 Design System Patterns from Existing Code

#### Styling Approach
The codebase uses Tailwind CSS with specific patterns:
- **Border radius**: `rounded-2xl`, `rounded-[32px]`, `rounded-xl`, `rounded-lg`
- **Colors**: 
  - Primary: `#042BFD` (blue), `#021165` (dark blue)
  - Backgrounds: `#F8FAFC` (light gray)
  - Status colors: green (live), blue (scheduled), gray (completed), red (missed)
- **Spacing**: `p-6`, `p-8`, `gap-6`, `gap-8`
- **Typography**: Bold headings, medium body text, specific font sizes

#### UI Components
- **Modals**: Fixed overlay with centered modal (using `fixed inset-0 z-50`, `bg-black/50 backdrop-blur-sm`)
- **Tables**: Header with tabs, search filters, action buttons
- **Forms**: Label + input pattern with validation states
- **Buttons**: Primary actions in dark colors (`bg-[#042BFD]`), secondary in gray outlines

#### State Management
- React `useState` for local state
- React Query for server state (in `/src/lib/queries/`)
- Form handling patterns (see `CreateSession.tsx` for form wizard)

#### Loading States
- Loading spinners using `lucide-react` icons with `animate-spin`
- Skeleton loaders where appropriate

---

## 2. SESSION CREATION FLOW - COMPREHENSIVE REQUIREMENTS

### 2.1 Session Categories (Types)

The system must support **four session types**:
1. **Webinar** - Large group online sessions
2. **Cohort** - Structured cohort-based learning
3. **Workshop** - Hands-on practical sessions
4. **Mentorship** - 1:1 mentoring sessions

Additional categorization for organization:
- **By Status**: Scheduled, Live, Completed, Missed
- **By Date**: Upcoming, Past
- **By Educator**: Filter by assigned educator

### 2.2 Admin Session Creation Flow (Primary Flow)

The Admin user creates sessions through the `/a/sessions` route with a multi-step wizard:

#### Step 1: Basic Information
- **Session Title**: Text input (required)
- **Session Type**: Dropdown selection (Webinar, Cohort, Workshop, Mentorship)
- **Session Description**: Text area
- **Category/Tag**: Optional categorization

#### Step 2: Schedule Configuration
- **Scheduled Date**: Date picker
- **Start Time**: Time picker
- **End Time**: Time picker  
- **Timezone**: Dropdown
- **Duration**: Auto-calculated or manual input

#### Step 3: Educator Assignment
- **Select Educator**: Dropdown populated from API (GET `/api/admin/users?role=educator`)
- **Educator Details Display**: Show educator name, specialization
- **Alternative**: Option to assign later

#### Step 4: Student Enrollment
- **Enrollment Type**: Individual, Cohort, or Open (all students)
- **Select Students**: Multi-select dropdown (GET `/api/admin/users?role=student`)
- **Select Cohort**: If enrolling by cohort
- **Max Capacity**: Number input (optional)
- **Current Enrollment**: Display count

#### Step 5: Review & Confirmation
- **Summary Display**: All entered information
- **Edit Option**: Ability to go back and edit
- **Create Button**: Submit to create session
- **Success Feedback**: Toast/message on success
- **Redirect Option**: Go to session list or create another

### 2.3 Educator Session Creation Flow (Limited)

Educators can also create sessions but with restrictions:

#### Flow A: Assign Existing Session to Students
- Select from available sessions (from educator's assigned sessions)
- Add/remove students from session
- Set/modify due dates for assignments
- Set session status to "Scheduled"

#### Flow B: Create Assignment Link
- Create assignment tied to educator's session
- Assign to specific students
- Set due date
- This appears as assignment in student's dashboard

### 2.4 Student Session Interaction Flow

Students interact with sessions in these ways:

#### Flow A: View Available Sessions
- View assigned sessions in `/s/sessions`
- Filter by status (Upcoming, Completed)
- View session details

#### Flow B: Join Session
- Click to join active/live session
- View session link/meeting URL
- View materials/resources

#### Flow C: Submit Assignments
- Navigate to assignment from session
- Upload submission
- Add comments
- Track status

---

## 3. DETAILED FLOW SPECIFICATIONS

### 3.1 Admin: Create Session Flow (Step-by-Step)

```
[Admin] → [/a/sessions] → Click "Create Session" 
  → [CreateSession Modal/Page] → Step 1: Basic Info
  → Step 2: Schedule 
  → Step 3: Educator
  → Step 4: Students  
  → Step 5: Review
  → Submit → API: POST /api/admin/sessions
  → Success → Redirect to Session List
```

**API Request Format:**
```json
{
  "title": "string",
  "description": "string",
  "sessionType": "Webinar" | "Cohort" | "Workshop" | "Mentorship",
  "scheduledDate": "ISO date string",
  "startTime": "HH:MM",
  "endTime": "HH:MM",
  "timezone": "string",
  "educatorId": "string",
  "studentIds": ["string"],
  "maxCapacity": number,
  "status": "Scheduled"
}
```

**API Response:**
```json
{
  "success": true,
  "data": {
    "sessionId": "string",
    "title": "string",
    "status": "Scheduled"
  }
}
```

### 3.2 Educator: Create Assignment Flow (Step-by-Step)

```
[Educator] → [/e/assignments] → Click "New Assignment"
  → [CreateAssignment Modal] 
  → Select Student (from dropdown)
  → Select Session (from dropdown)
  → Select Session Type
  → Set Due Date
  → Submit → API: POST /api/educator/assignments/create
  → Success → Update Local State
```

**API Request Format (FormData):**
```
title: "string"
description: "string"  
sessionType: "Webinar" | "Cohort" | "Workshop" | "Mentorship"
dueDate: "YYYY-MM-DD"
sessionId: "string"
assignedStudents: JSON string ["studentId"]
```

### 3.3 Student: View & Join Session Flow

```
[Student] → [/s/sessions] → View Session List
  → Click Session → [/s/sessions/[slug]]
  → View Details (title, educator, date, status)
  → If Live: Click "Join Session"
  → If Upcoming: View details
  → If Completed: View Recording (if available)
```

### 3.4 Student: Submit Assignment Flow

```
[Student] → [/s/assignments] → Click Assignment
  → [/s/assignments/[slug]]
  → View Instructions
  → Click "Submit Assignment"
  → [UploadAssignmentModal]
  → Upload File (PDF, max 10MB)
  → Add Comments (optional)
  → Submit → API: POST /api/student/assignments/submit
  → Success → Status changes to "Submitted"
```

---

## 4. USER INTERFACE SPECIFICATIONS

### 4.1 Admin Session Creation UI

**Location:** `/src/app/(admindash)/a/sessions/components/CreateSession.tsx`

The component should follow the existing patterns:

#### Multi-Step Form Pattern
- Progress indicator showing current step
- "Back" and "Next" navigation buttons
- Form validation per step before proceeding
- Final "Create Session" button on last step

#### Form Elements
- Text inputs with labels (`block text-sm font-medium text-gray-700`)
- Dropdowns with required styling
- Date pickers with proper format
- Multi-select for students
- Search/filter for users

#### Styling Matches
```tsx
// Container
<div className="flex flex-col gap-8 p-6 md:p-10">

// Header  
<h1 className="text-3xl md:text-4xl font-black text-[#021165] tracking-tight">

// Primary Button
<button className="flex items-center justify-center gap-2 bg-[#042BFD] text-white px-6 py-3 rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-[#0325D7] transition-all shadow-lg shadow-blue-600/20 active:scale-95">

// Input
<input className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-[#042BFD]/20 transition-all shadow-sm">

// Modal
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
  <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
```

### 4.2 Admin Session List UI

**Location:** `/src/app/(admindash)/a/sessions/components/AllSessions.tsx`

Existing features to maintain:
- Tab filtering: All, Upcoming, Completed, Missed
- Search by ID or educator
- View toggle: List / Calendar
- Session table with all columns
- Click to view details in side panel

### 4.3 Educator Assignment Creation UI

**Location:** `/src/app/(educatordash)/e/assignments/page.tsx`

Existing CreateAssignmentModal to enhance:
- Student selector dropdown
- Session selector dropdown
- Session type dropdown
- Due date picker
- Form validation
- Error handling with display
- Loading states

### 4.4 Student Assignment UI

**Location:** `/src/app/(studentdash)/s/assignments/[slug]/page.tsx`

Existing features:
- Assignment details display
- Upload button triggering modal
- Status indicators
- Comments section

---

## 5. DATA VALIDATION REQUIREMENTS

### 5.1 Session Creation Validation

**Required Fields:**
- title: String, 1-200 characters
- sessionType: Enum (Webinar, Cohort, Workshop, Mentorship)
- scheduledDate: ISO date string, must be future date (for new sessions)
- startTime: Valid time format
- endTime: Valid time format, must be after startTime
- educatorId: Valid user ID with educator role

**Optional Fields:**
- description: String, max 2000 characters
- studentIds: Array of valid student IDs
- maxCapacity: Number, positive integer
- timezone: Valid timezone string

**Conditional Validation:**
- If sessionType is "Mentorship", educatorId is required
- If maxCapacity provided, must be >= studentIds.length
- If studentIds provided, all must be valid student users

### 5.2 Assignment Creation Validation

**Required Fields:**
- title: String
- description: String  
- sessionType: Enum (Webinar, Cohort, Workshop, Mentorship)
- dueDate: Date string
- sessionId: Valid session ID
- assignedStudents: Array with at least one student ID

### 5.3 Assignment Submission Validation (Student)

**Required Fields:**
- assignmentId: Valid assignment ID
- file: PDF format, max 10MB

**Optional Fields:**
- comment: String

---

## 6. ERROR HANDLING SPECIFICATIONS

### 6.1 API Error Handling

**Pattern from existing code:**
```typescript
try {
  const response = await AdminAPI.getSessions();
  // Handle response
} catch (error: any) {
  // Display error message
  setError(error.message || 'Failed to fetch sessions');
}
```

### 6.2 Form Validation Errors

Display inline with red styling:
```tsx
{error && (
  <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
    {error}
  </div>
)}
```

### 6.3 Network Errors

Handle with retry option, offline detection, and timeout messages.

---

## 7. STATE MANAGEMENT SPECIFICATIONS

### 7.1 Session List State
- sessions: Session[] - List of sessions
- loading: boolean - Loading state
- error: string | null - Error message
- activeTab: Tab - Current filter
- search: string - Search query
- viewMode: "list" | "calendar" - View toggle

### 7.2 Session Creation Form State
Use React state or form library:
- currentStep: number - Current wizard step
- formData: SessionFormData - Form values
- validationErrors: Record<string, string> - Field errors
- submitting: boolean - Submit state

### 7.3 Update Flow
When session created successfully:
```typescript
const handleSuccess = (newSession: Session) => {
  setSessions(prev => [newSession, ...prev]);
  setShowModal(false);
};
```

---

## 8. API INTEGRATION PATTERNS

### 8.1 Fetching Sessions (Admin)

```typescript
// In page.tsx
useEffect(() => {
  const fetchSessions = async () => {
    try {
      const response = await AdminAPI.getSessions(params);
      const apiSessions = asArray(response).map(transformSession);
      setSessions(apiSessions);
    } catch {
      setSessions([]);
    }
  };
  fetchSessions();
}, []);
```

### 8.2 Creating Session (Admin)

```typescript
// In CreateSession.tsx
const handleSubmit = async (formData: FormData) => {
  setSubmitting(true);
  try {
    const response = await AdminAPI.createSession(formData);
    onSuccess(transformSession(response));
  } catch (error: any) {
    setError(error.message);
  } finally {
    setSubmitting(false);
  }
};
```

### 8.3 Transformations (Critical!)

**IMPORTANT:** The API response may contain objects where strings are expected. Always transform:

```typescript
const transformSession = (item: any): Session => {
  // Extract educator (may be object or string)
  let educatorName = "Educator";
  if (typeof item.educator === 'string') {
    educatorName = item.educator;
  } else if (item.educator?.name) {
    educatorName = item.educator.name;
  } else if (item.educatorName) {
    educatorName = item.educatorName;
  }

  // Extract type
  let sessionType = "Webinar";
  if (typeof item.type === 'string') {
    sessionType = item.type;
  } else if (item.type?.name) {
    sessionType = item.type.name;
  } else if (item.sessionType) {
    sessionType = item.sessionType;
  }

  // Extract students count
  let studentsCount = 0;
  if (typeof item.students === 'number') {
    studentsCount = item.students;
  } else if (Array.isArray(item.students)) {
    studentsCount = item.students.length;
  }

  return {
    id: String(item.id || item._id || item.sessionId),
    type: sessionType,
    educator: educatorName,
    students: studentsCount,
    date: new Date(item.date || item.scheduledDate).toLocaleDateString(),
    status: item.status === "Upcoming" ? "Scheduled" : item.status
  };
};
```

---

## 9. COMPATIBILITY WITH EXISTING COMPONENTS

### 9.1 Session Types Integration

The Session type in `/src/app/(admindash)/types/SessionType.ts` must be extended or the transform function must adapt:

```typescript
// Current type - limited fields
export interface Session {
    id: string;
    type: Type;
    educator: string;
    students: number,
    date: string;
    status: Status;
}

// Extended usage - use transform to match
// Then map to Session type for display
```

### 9.2 Component Interface Compatibility

SessionTable expects:
```typescript
<SessionTable 
  data={filteredData} 
  showHeader={true} 
  onRowClick={setSelectedSession}
  selectedSessionId={selectedSession?.id}
/>
```

So the data passed must be an array of Session objects per the type definition.

---

## 10. COMPLETE FLOW VISUALS

### 10.1 Admin Session Management Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    ADMIN DASHBOARD                         │
│                      /a/dashboard                         │
└─────────────────┬─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                   SESSIONS LIST                           │
│                    /a/sessions                           │
│  ┌─────────┬─────────┬─────────┬──────────┐               │
│  │   All   │Upcoming │Completed│  Missed  │ (Tabs)       │
│  └─────────┴─────────┴─────────┴──────────┘               │
│                                                          │
│  [Search by ID/Educator...]  [+ Create Session]             │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ SessionTable                                       │  │
│  │ ID      │ Type     │ Educatr ��� Students │ Status │  │
│  │─────────│──────────│─────────│──────────│────────│  │
│  │ SESS-01 │ Webinar │ John D. │ 25       │ Sched. │  │
│  │ SESS-02 │ Cohort  │ Jane S. │ 10       │ Live   │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────────┬─────────────────────────────────────────────┘
                  │
                  ├─► View Details (Side Panel)
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              CREATE SESSION (WIZARD)                      │
│                                                           │
│  Step 1: Basic Info  ───►  Step 2: Schedule              │
│  Step 3: Educator    ───►  Step 4: Students              │
│  Step 5: Review      ───►  Submit                        │
└─────────────────────────────────────────────────────────────┘
```

### 10.2 Educator Assignment Creation Overview

```
┌─────────────────────────────────────────────────────────────┐
│                 EDUCATOR DASHBOARD                        │
│                    /e/dashboard                           │
└─────────────────┬─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                ASSIGNMENTS LIST                            │
│                  /e/assignments                           │
│  [All] [Pending] [Completed]                               │
│                                                          │
│  [+ New Assignment]                                       │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ AssignmentTable                                   │  │
│  │ ID     │ Student │ Session  │ Due Date │ Status  │  │
│  │────────│─────────│──────────│──────────│────────│  │
│  │ ASS-01 │ Alice   │ Web Dev  │ Jan 15   │Pending │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────────┬─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│            CREATE ASSIGNMENT MODAL                         │
��  ┌─────────────────────────────────────────────────┐    │
│  │ Select Student: [Dropdown]                     │    │
│  │ Select Session: [Dropdown]                  │    │
│  │ Session Type:  [Webinar ▼]                 │    │
│  │ Due Date:     [Date Picker]                │    │
│  │                                             │    │
│  │ [Cancel]         [Create Assignment]          │    │
│  └─────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### 10.3 Student Assignment Workflow Overview

```
┌─────────────────────────────────────────────────────────────┐
│                  STUDENT DASHBOARD                        │
│                   /s/dashboard                            │
└─────────────────┬─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                 ASSIGNMENTS LIST                          │
│                   /s/assignments                          │
│  [Pending] [Submitted] [All]                              │
│                                                          │
│  ┌────────────────────────────────────────────────────┐  │
│  │ AssignmentTable                                   │  │
│  │ ID     │ Course   │ Due Date │ Status  │ Action   │  │
│  │────────│──────────│──────────│─────────│──────────│  │
│  │ ASS-01 │ Web Dev  │ Jan 15  │Pending │ [Upload] │  │
│  │ ASS-02 │ React    │ Jan 20  │Submitted│ [View]  │  │
│  └────────────────────────────────────────────────────┘  │
└─────────────────┬─────────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│           ASSIGNMENT DETAILS / SUBMIT                      │
│                /s/assignments/[slug]                      │
│                                                           │
│  Title: Introduction to React                                │
│  Course: Web Development Bootcamp                          │
│  Due Date: January 15, 2025                                │
│  Status: Pending                                           │
│  Instructions: ...                                         │
│                                                           │
│  ┌─────────────────────────────────────────────────┐       │
│  │           UPLOAD ASSIGNMENT                    │       │
│  │  ┌─────────────────────────────────────────┐   │       │
│  │  │  Drop file here or click to upload    │   │       │
│  │  │  PDF format, max 10MB                 │   │       │
│  │  └─────────────────────────────────────────┘   │       │
│  │                                             │       │
│  │  Add Comments (optional):                   │       │
│  │  [Text area...]                              │       │
│  │                                             │       │
│  │  [Cancel]        [Submit]                    │       │
│  └─────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

---

## 11. IMPLEMENTATION CHECKLIST

### 11.1 Admin Session Creation
- [ ] Create/update CreateSession component in `/src/app/(admindash)/a/sessions/components/`
- [ ] Implement multi-step wizard form
- [ ] Add form validation for all required fields
- [ ] Connect to AdminAPI.createSession() method
- [ ] Handle loading states
- [ ] Handle success/error responses
- [ ] Update local state on success

### 11.2 Educator Assignment Creation  
- [ ] Enhance existing CreateAssignmentModal in `/src/app/(educatordash)/e/assignments/`
- [ ] Ensure proper field mapping (sessionId, not courseId)
- [ ] Connect to EducatorAPI.createAssignment()
- [ ] Validate required fields before submit

### 11.3 API Service Methods
- [ ] Add AdminAPI.createSession() method in `/src/lib/api.ts`
- [ ] Add proper serialization for session data
- [ ] Handle authentication headers
- [ ] Add error handling

### 11.4 Data Transformations
- [ ] Ensure all API responses are transformed to match UI types
- [ ] Handle nested objects (educator, students as objects)
- [ ] Convert dates to display format
- [ ] Handle missing/null fields safely

### 11.5 Testing Points
- [ ] Test admin session creation flow with all session types
- [ ] Test educator assignment creation
- [ ] Test student assignment submission
- [ ] Verify data displays correctly in tables
- [ ] Test error handling and edge cases
- [ ] Verify role-based access control

---

## 12. KEY FILES TO REFERENCE FOR IMPLEMENTATION

### 12.1 Admin Files
- `/src/app/(admindash)/a/sessions/page.tsx` - Main sessions page
- `/src/app/(admindash)/a/sessions/components/AllSessions.tsx` - Sessions list wrapper
- `/src/app/(admindash)/a/sessions/components/CreateSession.tsx` - Session creation (enhance)
- `/src/app/(admindash)/components/SessionTable.tsx` - Session table component
- `/src/app/(admindash)/types/SessionType.ts` - Session type definitions
- `/src/app/(admindash)/components/SessionDetailsPanel.tsx` - Session details drawer
- `/src/app/(admindash)/components/CalendarView.tsx` - Calendar view

### 12.2 Educator Files
- `/src/app/(educatordash)/e/assignments/page.tsx` - Assignments page
- `/src/app/(educatordash)/e/assignments/components/AssignmentList.tsx` - Assignment list

### 12.3 Student Files
- `/src/app/(studentdash)/s/assignments/[slug]/page.tsx` - Assignment details
- `/src/app/(studentdash)/s/overview/UploadAssignmentModal.tsx` - Upload modal

### 12.4 API Files
- `/src/lib/api.ts` - All API service methods
- `/src/lib/axios.ts` - Axios configuration and interceptors

### 12.5 Utility
- `/src/lib/api.ts` (asArray function) - For handling varied API response formats

---

## 13. SUMMARY

The session creation and management system involves three distinct user roles with different flows:

1. **Admin**: Creates sessions via multi-step wizard, manages all sessions, assigns educators and students, can edit/delete sessions
2. **Educator**: Creates assignments tied to their sessions, reviews submissions, manages their assigned students
3. **Student**: Views assigned sessions, views assignments, submits assignment work

All implementations must:
- Follow existing styling patterns (Tailwind CSS with specific colors, border-radius, spacing)
- Use existing API endpoints or add new ones with proper authentication
- Handle data transformations to ensure no objects are rendered as React children
- Implement proper validation and error handling
- Match the existing codebase conventions and patterns

This comprehensive prompt should enable the AJA agent to understand the full scope of session creation and management across all user roles, with detailed flow specifications and implementation patterns to follow.