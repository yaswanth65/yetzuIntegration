import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { api, authApi, getJwtUserId } from "./axios";

const dataOf = (response: any) => response?.data ?? response;

const getObjectKeys = (value: any): string[] =>
  value && typeof value === "object" ? Object.keys(value).slice(0, 12) : [];

const isFileLike = (value: any): boolean =>
  typeof File !== "undefined" && value instanceof File;

const getUserId = (): string => getJwtUserId(Cookies.get("jwtToken")) || Cookies.get("userId") || "";

// Note: authApi interceptor adds Authorization + x-user-id headers automatically
// withCredentials: true sends cookies (browser blocks manual Cookie header)

const withUserId = (payload: Record<string, any> = {}) => {
  const userId = getUserId();
  return userId ? { ...payload, userId } : payload;
};

const logApiFailure = (label: string, error: unknown, meta?: Record<string, any>) => {
  const axiosError = error as AxiosError;
  console.error(`[API:${label}]`, {
    meta,
    message: axiosError?.message,
    status: axiosError?.response?.status,
    response: axiosError?.response?.data,
  });
};

const appendFormDataValue = (formData: FormData, key: string, value: any) => {
  if (value === undefined || value === null || value === "") return;
  if (Array.isArray(value) || (typeof value === "object" && !isFileLike(value) && !(value instanceof Blob))) {
    formData.append(key, JSON.stringify(value));
    return;
  }
  if (typeof value === "boolean") {
    formData.append(key, value ? "true" : "false");
    return;
  }
  formData.append(key, value as string | Blob);
};

const buildFormData = (payload: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(payload).forEach(([key, value]) => appendFormDataValue(formData, key, value));
  return formData;
};

export const asArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;

  const candidates = [
    value?.data?.list,
    value?.data?.items,
    value?.data?.session?.list,
    value?.data?.sessions?.list,
    value?.data?.assignments?.list,
    value?.data?.requests,
    value?.data?.notifications,
    value?.data?.messages,
    value?.data?.courses,
    value?.data?.userList,
    value?.data?.students,
    value?.data?.educators,
    value?.data?.submissions,
    value?.data?.organizations,
    value?.data?.contacts,
    value?.data?.coupons,
    value?.data?.certificates,
    value?.data,
    value?.items,
    value?.list,
    value?.session?.list,
    value?.sessions?.list,
    value?.assignments?.list,
    value?.requests,
    value?.courses,
    value?.assignments,
    value?.sessions,
    value?.userList,
    value?.notifications,
    value?.educators,
    value?.students,
    value?.messages,
    value?.submissions,
    value?.organizations,
    value?.contacts,
    value?.coupons,
    value?.certificates,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  return [];
};

export const CourseAPI = {
  getAllCourses: async (params?: { search?: string; minCost?: number; maxCost?: number }) => {
    try {
      const response = await authApi.get("/api/course/v1/courselist", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("CourseAPI.getAllCourses", error, { params });
      throw error;
    }
  },

  getCourseById: async (courseId: string) => {
    try {
      const response = await api.get(`/api/course/v1/get/${courseId}`);
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("CourseAPI.getCourseById.primary", primaryError, { courseId });
      try {
        const fallbackResponse = await api.get(`/api/courses/${courseId}`);
        return dataOf(fallbackResponse);
      } catch (fallbackError) {
        logApiFailure("CourseAPI.getCourseById.fallback", fallbackError, { courseId });
        throw fallbackError;
      }
    }
  },
};

export const PublicSessionsAPI = {
  getAll: async (params?: { status?: string }) => {
    try {
      const response = await api.get("/api/public/sessions", { params: { status: "all", ...params } });
      return dataOf(response);
    } catch (error) {
      logApiFailure("PublicSessionsAPI.getAll", error, { params });
      throw error;
    }
  },

  getById: async (sessionId: string) => {
    try {
      const response = await api.get(`/api/public/sessions/${sessionId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("PublicSessionsAPI.getById", error, { sessionId });
      throw error;
    }
  },
};

export const PaymentAPI = {
  createOrder: async (payload: { amount: number; currency?: string; sessionId?: string; sessionIds?: string[]; userId?: string }) => {
    try {
      const userId = getUserId();
      const body: Record<string, any> = {
        amount: payload.amount,
        currency: payload.currency || "INR",
        userId: userId
      };
      if (payload.sessionIds && payload.sessionIds.length > 0) {
        body.sessionIds = payload.sessionIds;
      } else if (payload.sessionId) {
        body.sessionId = payload.sessionId;
      }
      console.log("PaymentAPI.createOrder payload:", body);
      const response = await authApi.post("/api/payment/order", body);
      return dataOf(response);
    } catch (error) {
      logApiFailure("PaymentAPI.createOrder", error, { payload });
      throw error;
    }
},

  verifyPayment: async (payload: { userId: string; sessionId: string; amount: number }) => {
    try {
      const body = {
        event: "payment.captured",
        payload: {
          payment: {
            entity: {
              id: "pay_" + Date.now(),
              order_id: "order_" + Date.now(),
              amount: payload.amount * 100,
              currency: "INR",
              notes: {
                userId: payload.userId,
                sessionId: payload.sessionId
              }
            }
          }
        }
      };

      console.log("[PaymentAPI] verifyPayment payload:", JSON.stringify(body, null, 2));

      // Call the LOCAL webhook route (not proxied to production)
      const response = await fetch("/api/payment/webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-webhook-test-token": "TqSxD9F3-ru7ZCt"
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData?.error || `Webhook returned ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      logApiFailure("PaymentAPI.verifyPayment", error, { payload });
      throw error;
    }
  },
};

export const StudentAPI = {
  // GET /api/identityapi/v1/auth/me (from Postman "Me" endpoint)
  // Returns authenticated user's info
  me: async () => {
    try {
      const response = await authApi.get("/api/identityapi/v1/auth/me", {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.me", error);
      throw error;
    }
  },

  // GET /api/student/courses/enrolled (enrolled sessions)
  // authApi interceptor adds Authorization + x-user-id headers automatically
  getEnrolledSessions: async () => {
    try {
      const response = await authApi.get("/api/student/courses/enrolled", {
        withCredentials: true, // Send cookies automatically
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getEnrolledSessions", error);
      throw error;
    }
  },

  // Alias for getEnrolledSessions
  getEnrolledCourses: async () => {
    return StudentAPI.getEnrolledSessions();
  },

  // GET /api/public/sessions/{{sessionId}} (no auth required, uses sessionId not courseId)
  getPublicSession: async (sessionId: string) => {
    try {
      const response = await api.get(`/api/public/sessions/${sessionId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getPublicSession", error, { sessionId });
      throw error;
    }
  },

  // GET /api/student/dashboard/overview (from Postman spec)
  getDashboardOverview: async () => {
    try {
      const response = await authApi.post("/api/student/dashboard/overview", {}, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getDashboardOverview", error);
      return StudentAPI.me();
    }
  },

  getProfile: async () => {
    try {
      const response = await authApi.get("/api/identityapi/v1/auth/me");
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getProfile", error);
      throw error;
    }
  },

  getNotifications: async () => {
    try {
      const response = await authApi.get("/api/student/dashboard/notifications", {
        withCredentials: true, // Send cookies automatically (interceptor adds headers)
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getNotifications", error);
      throw error;
    }
  },

  getCertificates: async () => {
    try {
      const response = await authApi.get("/api/student/certificates", {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getCertificates", error);
      throw error;
    }
  },

  // Certificate methods moved to CertificateAPI.student namespace

  // Blogs (public - no auth required)
  getBlogs: async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const response = await api.get("/api/public/blogs", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getBlogs", error, { params });
      throw error;
    }
  },

  getBlogById: async (blogId: string) => {
    try {
      const response = await api.get(`/api/public/blogs/${blogId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getBlogById", error, { blogId });
      throw error;
    }
  },

  // Tickets (requires auth)
  getTickets: async () => {
    try {
      const response = await authApi.get("/api/student/tickets", {
        withCredentials: true, // Send cookies automatically
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getTickets", error);
      throw error;
    }
  },

  createTicket: async (payload: { subject: string; description: string; priority?: string }) => {
    try {
      const response = await authApi.post("/api/student/tickets", payload, {
        withCredentials: true, // Send cookies automatically
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.createTicket", error, { payload });
      throw error;
    }
  },

  getTicketById: async (ticketId: string) => {
    try {
      const response = await authApi.get(`/api/student/tickets/${ticketId}`, {
        withCredentials: true, // Send cookies automatically
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getTicketById", error, { ticketId });
      throw error;
    }
  },

  // Certificate methods moved to CertificateAPI.student namespace

  editProfile: async (data: { name?: string; email?: string; mobileno?: string; phone?: string }) => {
    const payload = {
      ...data,
      mobileno: data.mobileno ?? data.phone,
    };

    try {
      const response = await authApi.put("/api/student/edit-profile", payload);
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("StudentAPI.editProfile.primary", primaryError, { payload });
      try {
        const fallback = await authApi.put("/api/dashboard/updateStudentDetails", payload);
        return dataOf(fallback);
      } catch (fallbackError) {
        logApiFailure("StudentAPI.editProfile.fallback", fallbackError, { payload });
        throw fallbackError;
      }
    }
  },

  // GET /api/student/assignments (from Postman collection)
  getAssignments: async () => {
    try {
      const response = await authApi.get("/api/student/assignments", {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getAssignments", error);
      throw error;
    }
  },

  getAssignmentDetail: async (assignmentId: string) => {
    try {
      const response = await authApi.get(`/api/student/assignments/${assignmentId}`, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getAssignmentDetail", error, { assignmentId });
      throw error;
    }
  },

  uploadAssignment: async (formData: FormData) => {
    try {
      const response = await authApi.post("/api/assignment/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.uploadAssignment", error, {
        keys: Array.from(formData.keys()),
      });
      throw error;
    }
  },

  submitAssignment: async (assignmentId: string, file: File, comment?: string) => {
    if (!assignmentId || !file) {
      throw new Error("Assignment and file are required.");
    }

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("file", file);
    if (comment) {
      formData.append("comment", comment);
    }

    try {
      const response = await authApi.post("/api/student/assignments/submit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.submitAssignment", error, {
        assignmentId,
        fileName: file.name,
      });
      throw error;
    }
  },

  addAssignmentComment: async (payload: { assignmentId: string; comment: string }) => {
    try {
      const response = await authApi.post("/api/student/assignments/add-comment", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.addAssignmentComment", error, { payload });
      throw error;
    }
  },

  rescheduleSession: async (payload: { sessionId: string; reason: string; proposedDate: string }) => {
    if (!payload.sessionId || !payload.reason || !payload.proposedDate) {
      throw new Error("Session, reason, and proposed date are required.");
    }

    try {
      const response = await authApi.post("/api/student/session/reschedule-request", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.rescheduleSession", error, { payload });
      throw error;
    }
  },

  rescheduleCourse: async (payload: { courseId: string; reason: string; proposedDate: string }) => {
    if (!payload.courseId || !payload.reason || !payload.proposedDate) {
      throw new Error("Course, reason, and proposed date are required.");
    }

    try {
      const response = await authApi.post("/api/student/course/reschedule-request", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.rescheduleCourse", error, { payload });
      throw error;
    }
  },

  getChatEducators: async () => {
    try {
      const response = await authApi.get("/api/Studentchat/educators");
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getChatEducators", error);
      throw error;
    }
  },

  getChatMessages: async (educatorId: string) => {
    try {
      const response = await authApi.get("/api/Studentchat/messages", {
        params: { educatorId },
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getChatMessages", error, { educatorId });
      throw error;
    }
  },

  sendChatMessage: async (educatorId: string, content: string) => {
    try {
      const response = await authApi.post("/api/Studentchat/send", { educatorId, content });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.sendChatMessage", error, { educatorId, contentLength: content.length });
      throw error;
    }
  },

  getMeetingLink: async (userId: string) => {
    try {
      const response = await authApi.get("/api/user/getMeetingLink", {
        params: { userId }
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getMeetingLink", error, { userId });
      throw error;
    }
  },
};

export const EducatorAPI = {
  rescheduleSession: async (payload: { sessionId: string; reason: string; proposedDate: string; proposedTime: string }) => {
    try {
      const response = await authApi.post("/api/educator/session/reschedule-request", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.rescheduleSession", error, { payload });
      throw error;
    }
  },

  // getOverview removed - endpoint returns 500 error
  // Use getSessions() or getMySessions() instead

  getMySessions: async () => {
    try {
      const response = await authApi.get("/api/educator/sessions", {
        params: { page: 1, limit: 100 },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getMySessions", error);
      throw error;
    }
  },

  getSessions: async () => {
    return EducatorAPI.getMySessions();
  },

  getRescheduleRequests: async () => {
    try {
      const response = await authApi.post("/api/educator/reschedule/list", {});
      return dataOf(response);
    } catch (error) {
      console.warn("[API:EducatorAPI.getRescheduleRequests.primary] failed. Using session-derived fallback.", (error as any)?.message);
      // Fallback: fetch sessions and extract reschedule requests
      try {
        const sessionsRes = await EducatorAPI.getSessions();
        const sessions = asArray(sessionsRes);
        const requests = sessions.flatMap((session: any) => asArray(session?.rescheduleRequests));
        
        return {
          success: false,
          message: "Reschedule list endpoint unavailable. Using session-derived fallback.",
          data: {
            list: requests,
            count: requests.length,
          },
        };
      } catch (fallbackError) {
        logApiFailure("EducatorAPI.getRescheduleRequests.fallback", fallbackError);
        return {
          success: false,
          message: "Reschedule requests unavailable.",
          data: { list: [], count: 0 },
        };
      }
    }
  },

  handleRescheduleAction: async (payload: {
    courseId: string;
    requestId: string;
    action?: "approved" | "rejected";
    status?: "approved" | "rejected";
    educatorRemark: string;
  }) => {
    const body = {
      ...payload,
      status: payload.status ?? payload.action,
    };

    try {
      const response = await authApi.post("/api/educator/reschedule-action", {
        courseId: body.courseId,
        requestId: body.requestId,
        action: body.action || body.status,
        educatorRemark: body.educatorRemark,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.handleRescheduleAction", error, { body });
      throw error;
    }
  },

  createAssignment: async (formData: FormData) => {
  for (const field of ["title", "description", "dueDate"]) {
    if (!formData.get(field)) {
      throw new Error(`${field} is required.`);
    }
  }

  const sessionId = formData.get("sessionId");
  const courseId = formData.get("courseId");

  if (!sessionId && !courseId) {
    throw new Error("sessionId or courseId is required.");
  }

  try {
    const response = await authApi.post(
      "/api/educator/assignments/create",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return dataOf(response);
  } catch (primaryError) {
    logApiFailure("EducatorAPI.createAssignment.primary", primaryError, {
      keys: Array.from(formData.keys()),
    });
    throw primaryError;
  }
},

  getAssignments: async (params?: { status?: string; search?: string }) => {
    try {
      const response = await authApi.get("/api/educator/assignments/list", {
        params: { status: params?.status || "published", search: params?.search || "" },
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getAssignments", error);
      throw error;
    }
  },

  // GET /api/educator/assignments/{{id}} (from Postman: Get Assignment By ID)
  // Returns: assignment details + all student submissions with submitted files
  getAssignmentById: async (id: string) => {
    try {
      const response = await authApi.get(`/api/educator/assignments/${id}`, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getAssignmentById", error, { id });
      throw error;
    }
  },

  deleteAssignment: async (id: string) => {
    if (!id) throw new Error("Assignment id is required.");

    try {
      const response = await authApi.delete(`/api/educator/assignments/${id}`, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("EducatorAPI.deleteAssignment.primary", primaryError, { id });
      try {
        const fallback = await authApi.delete(`/api/educator/assignment/${id}`, {
          withCredentials: true,
        });
        return dataOf(fallback);
      } catch (fallbackError) {
        logApiFailure("EducatorAPI.deleteAssignment.fallback", fallbackError, { id });
        throw fallbackError;
      }
    }
  },

  // GET /api/educator/assignments?status=published (from Postman)
  getAssignmentsBySession: async (sessionId: string) => {
    try {
      const response = await authApi.get(`/api/educator/assignments`, {
        params: { sessionId, status: "published" },
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getAssignmentsBySession", error, { sessionId });
      throw error;
    }
  },

  addFeedback: async (payload: { assignmentId: string; text: string }) => {
    try {
      const response = await authApi.post("/api/educator/assignments/feedback", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.addFeedback", error, { payload });
      throw error;
    }
  },

  // Certificate methods moved to CertificateAPI.educator namespace

  updateAssignmentStatus: async (payload: { assignmentId: string; status: string }) => {
    try {
      const response = await authApi.post("/api/educator/assignments/status", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.updateAssignmentStatus", error, { payload });
      throw error;
    }
  },

  getAssignmentSessionOptions: async (params?: { search?: string; status?: string; onlyAssignable?: boolean; includeAll?: boolean }) => {
    try {
      const response = await authApi.get("/api/educator/assignments/session-options", {
        params: {
          search: params?.search || "",
          status: params?.status || "all",
          onlyAssignable: params?.onlyAssignable ?? true,
          includeAll: params?.includeAll ?? false,
        },
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getAssignmentSessionOptions", error, { params });
      throw error;
    }
  },

  uploadSessionResource: async (sessionId: string, formData: FormData) => {
    if (!formData.get('description')) {
      formData.set('description', formData.get('title') || '');
    }
    try {
      const response = await authApi.post(`/api/educator/sessions/${sessionId}/files`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.uploadSessionResource", error, { sessionId });
      throw error;
    }
  },

  getSessionFiles: async (sessionId: string) => {
    try {
      const response = await authApi.get(`/api/educator/sessions/${sessionId}/files`, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getSessionFiles", error, { sessionId });
      throw error;
    }
  },

  updateSessionFile: async (sessionId: string, formData: FormData) => {
    try {
      const response = await authApi.put(`/api/educator/sessions/${sessionId}/files`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.updateSessionFile", error, { sessionId });
      throw error;
    }
  },

  deleteSessionFile: async (sessionId: string, resourceId: string) => {
    try {
      const response = await authApi.delete(`/api/educator/sessions/${sessionId}/files`, {
        params: { resourceId },
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.deleteSessionFile", error, { sessionId, resourceId });
      throw error;
    }
  },

  getSubmissions: async (params?: { page?: number; limit?: number; status?: string; assignmentId?: string; sessionId?: string; studentId?: string; search?: string }) => {
    try {
      const response = await authApi.get("/api/educator/assignments/submissions", {
        params: {
          page: params?.page ?? 1,
          limit: params?.limit ?? 10,
          status: params?.status || "all",
          assignmentId: params?.assignmentId || "",
          sessionId: params?.sessionId || "",
          studentId: params?.studentId || "",
          search: params?.search || "",
        },
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getSubmissions", error, { params });
      throw error;
    }
  },

  getSubmissionById: async (submissionId: string) => {
    try {
      const response = await authApi.get(`/api/educator/assignments/submissions/${submissionId}`, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getSubmissionById", error, { submissionId });
      throw error;
    }
  },

  getPendingSubmissions: async () => {
    try {
      const response = await authApi.post("/api/educator/submissions/pending", {});
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getPendingSubmissions.primary", error);
      const assignmentsResponse = await EducatorAPI.getAssignments();
      const pending = asArray(assignmentsResponse).flatMap((assignment: any) =>
        asArray(assignment?.submissions).filter((submission: any) => {
          const status = String(submission?.status || "").toLowerCase();
          return status === "submitted" || status === "pending";
        }).map((submission: any) => ({
          ...submission,
          assignmentId: assignment.id || assignment.assignmentId,
          assignmentTitle: assignment.title,
          studentName:
            submission.studentName ||
            submission.student?.name ||
            assignment.assignedStudents?.[0]?.name ||
            "Student",
        })),
      );

      return {
        success: false,
        message: "Pending submissions endpoint unavailable. Using assignment submissions fallback.",
        data: {
          list: pending,
          count: pending.length,
        },
      };
    }
  },

  reviewSubmission: async (payload: { submissionId: string; status: string; educatorRemark: string }) => {
    try {
      const response = await authApi.post("/api/educator/submissions/review", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.reviewSubmission", error, { payload });
      throw error;
    }
  },

  addSubmissionComment: async (submissionId: string, educatorRemark: string) => {
    try {
      const response = await authApi.patch(`/api/educator/assignments/submissions/${submissionId}`, { educatorRemark });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.addSubmissionComment", error, { submissionId, educatorRemark });
      throw error;
    }
  },

  patchSubmission: async (submissionId: string, payload: { educatorRemark?: string; status?: string; feedbackUrl?: string }) => {
    try {
      const response = await authApi.patch(`/api/educator/assignments/submissions/${submissionId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.patchSubmission", error, { submissionId, payload });
      throw error;
    }
  },

  uploadFeedbackFile: async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await authApi.post("/api/assignment/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = response?.data?.data || response?.data || response;
      return result?.url || result?.fileUrl || result?.path || "";
    } catch (error) {
      logApiFailure("EducatorAPI.uploadFeedbackFile", error, { fileName: file.name });
      throw error;
    }
  },

  getNotifications: async () => {
    try {
      const response = await authApi.get("/api/educator/dashboard/notifications");
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getNotifications", error);
      throw error;
    }
  },

  // Tickets
  getTickets: async () => {
    try {
      const response = await authApi.get("/api/educator/tickets", {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getTickets", error);
      throw error;
    }
  },

  createTicket: async (payload: { subject: string; description: string; priority?: string; category?: string; sessionId?: string }) => {
    try {
      const response = await authApi.post("/api/educator/tickets", payload, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.createTicket", error, { payload });
      throw error;
    }
  },

  getTicketById: async (ticketId: string) => {
    try {
      const response = await authApi.get(`/api/educator/tickets/${ticketId}`, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getTicketById", error, { ticketId });
      throw error;
    }
  },
};

export const HelpArticlesAPI = {
  getAll: async (params?: { search?: string; page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/student/help/articles", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("HelpArticlesAPI.getAll", error, { params });
      throw error;
    }
  },

  getById: async (articleId: string) => {
    try {
      const response = await authApi.get(`/api/student/help/articles/${articleId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("HelpArticlesAPI.getById", error, { articleId });
      throw error;
    }
  },
};

export const BillingAPI = {
  getInvoices: async (params?: { page?: number; limit?: number; search?: string }) => {
    try {
      const response = await authApi.get("/api/student/billing/invoices", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("BillingAPI.getInvoices", error, { params });
      throw error;
    }
  },

  downloadInvoice: async (invoiceId: string) => {
    try {
      const response = await authApi.get(`/api/student/invoices/${invoiceId}/download`, {
        responseType: "blob",
        withCredentials: true,
      });
      return response;
    } catch (error) {
      logApiFailure("BillingAPI.downloadInvoice", error, { invoiceId });
      throw error;
    }
  },
};

export const EducatorChatAPI = {
  getStudents: async () => {
    try {
      const sessionsResponse = await EducatorAPI.getMySessions();
      const sessions = asArray(sessionsResponse);
      const studentMap = new Map<string, any>();

      for (const session of sessions) {
        const raw = session.students || session.studentDetails || [];
        if (!Array.isArray(raw)) continue;

        for (const entry of raw) {
          if (typeof entry === "string") {
            if (!studentMap.has(entry)) {
              studentMap.set(entry, {
                id: entry,
                name: `Student ${entry.substring(0, 8)}`,
              });
            }
          } else if (entry && typeof entry === "object") {
            const sid = entry.id || entry._id || "";
            if (sid && !studentMap.has(sid)) {
              studentMap.set(sid, {
                id: sid,
                name: entry.name || entry.studentName || `Student ${sid.substring(0, 8)}`,
                email: entry.email || entry.studentEmail || "",
                mobileno: entry.mobileno || entry.mobileNo || "",
              });
            }
          }
        }
      }

      return Array.from(studentMap.values());
    } catch (error) {
      logApiFailure("EducatorChatAPI.getStudents", error);
      throw error;
    }
  },

  getMessages: async (studentId: string) => {
    try {
      const res = await fetch(`/api/Educatorchat/messages?studentId=${encodeURIComponent(studentId)}`);
      const json = await res.json();
      return dataOf(json);
    } catch (error) {
      logApiFailure("EducatorChatAPI.getMessages", error, { studentId });
      throw error;
    }
  },

  sendMessage: async (studentId: string, content: string) => {
    try {
      const res = await fetch("/api/Educatorchat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, content }),
      });
      const json = await res.json();
      return dataOf(json);
    } catch (error) {
      logApiFailure("EducatorChatAPI.sendMessage", error, { studentId, contentLength: content.length });
      throw error;
    }
  },
};

export const AdminAPI = {
  // getOverview - returns data from users/sessions APIs (admin/overview returns 500)
  getOverview: async () => {
    try {
      // Try the admin overview endpoint first
      const response = await authApi.get("/api/admin/overview");
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getOverview", error);
      // Fallback: fetch users and sessions to build overview
      try {
        const [users, sessions] = await Promise.all([
          AdminAPI.getUsers({ page: 1, limit: 100 }),
          AdminAPI.getSessions({ page: 1, limit: 100 }),
        ]);
        const userList = asArray(users);
        const sessionList = asArray(sessions);

        return {
          success: true,
          data: {
            cards: {
              activeStudents: userList.filter((user: any) => 
                (user.role || user.Role || '').toLowerCase() === "student").length,
              activeEducators: userList.filter((user: any) => 
                (user.role || user.Role || '').toLowerCase() === "educator").length,
              sessionsToday: sessionList.filter((session: any) => {
                const rawDate = session.scheduleDate || session.scheduledDate || session.date;
                if (!rawDate) return false;
                return new Date(rawDate).toDateString() === new Date().toDateString();
              }).length,
              certificatesIssued: 0,
            },
            liveActivityFeed: [],
            alerts: [],
          },
        };
      } catch (fallbackError) {
        logApiFailure("AdminAPI.getOverview.fallback", fallbackError);
        return {
          success: false,
          data: {
            cards: { activeStudents: 0, activeEducators: 0, sessionsToday: 0, certificatesIssued: 0 },
            liveActivityFeed: [],
            alerts: [],
          },
        };
      }
    }
  },

  getUsers: async (params?: { search?: string; status?: string; role?: string; page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/users", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getUsers", error, { params });
      throw error;
    }
  },

  getUserById: async (userId: string) => {
    try {
      const response = await authApi.get(`/api/admin/users/${userId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getUserById", error, { userId });
      throw error;
    }
  },

  createUser: async (payload: {
    name: string;
    email: string;
    password?: string;
    mobileno?: string;
    role: string;
    status?: string;
    permissions?: Record<string, boolean>;
    inviteMethod?: "email_invite" | "temp_password";
    organizationId?: string;
    sendCredentialsEmail?: boolean;
    sendInviteEmail?: boolean;
    metadata?: Record<string, any>;
  }) => {
    if (!payload.name || !payload.email || !payload.role) {
      throw new Error("Name, email, and role are required.");
    }

    try {
      const response = await authApi.post("/api/admin/users", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createUser", error, { payload });
      throw error;
    }
  },

  updateUser: async (payload: { userId: string; name?: string; email?: string; mobileno?: string; status?: string; role?: string; metadata?: Record<string, any> }) => {
    const { userId, ...body } = payload;
    try {
      const response = await authApi.put(`/api/admin/users/${userId}`, body);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateUser", error, { payload });
      throw error;
    }
  },

  deleteUser: async (userId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/users/${userId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteUser", error, { userId });
      throw error;
    }
  },

  getOrganizations: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/organizations", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getOrganizations", error, { params });
      throw error;
    }
  },

  createOrganization: async (payload: Record<string, any>) => {
    if (!payload.name || !payload.type || !payload.email) {
      throw new Error("Organization name, type, and email are required.");
    }

    try {
      const response = await authApi.post("/api/admin/organizations", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createOrganization", error, { payload });
      throw error;
    }
  },

  getOrganization: async (organizationId: string) => {
    try {
      const response = await authApi.get(`/api/admin/organizations/${organizationId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getOrganization", error, { organizationId });
      throw error;
    }
  },

  updateOrganization: async (organizationId: string, payload: {
    name?: string;
    type?: string;
    email?: string;
    status?: string;
    billingCycle?: string;
  }) => {
    try {
      const response = await authApi.put(`/api/admin/organizations/${organizationId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateOrganization", error, { organizationId, payload });
      throw error;
    }
  },

  deleteOrganization: async (organizationId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/organizations/${organizationId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteOrganization", error, { organizationId });
      throw error;
    }
  },

  // ── Organization Students ──────────────────────────────────────────────────

  getOrganizationStudents: async (organizationId: string, params?: { page?: number; limit?: number; status?: string; search?: string }) => {
    try {
      const response = await authApi.get(`/api/organizations/${organizationId}/students`, { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getOrganizationStudents", error, { organizationId, params });
      throw error;
    }
  },

  addOrganizationStudent: async (organizationId: string, payload: { name: string; email: string; password: string; mobileNo?: string }) => {
    try {
      const response = await authApi.post(`/api/organizations/${organizationId}/students`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.addOrganizationStudent", error, { organizationId, payload });
      throw error;
    }
  },

  importOrganizationStudents: async (organizationId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await authApi.post(`/api/organizations/${organizationId}/students/import`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.importOrganizationStudents", error, { organizationId });
      throw error;
    }
  },

  updateOrganizationStudent: async (organizationId: string, studentId: string, payload: { name?: string; mobileNo?: string }) => {
    try {
      const response = await authApi.put(`/api/organizations/${organizationId}/students/${studentId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateOrganizationStudent", error, { organizationId, studentId, payload });
      throw error;
    }
  },

  updateOrganizationStudentStatus: async (organizationId: string, studentId: string, status: string) => {
    try {
      const response = await authApi.patch(`/api/organizations/${organizationId}/students/${studentId}/status`, { status });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateOrganizationStudentStatus", error, { organizationId, studentId, status });
      throw error;
    }
  },

  // ── Access Permissions ─────────────────────────────────────────────────────

  getAccessPermissions: async (organizationId: string) => {
    try {
      const response = await authApi.get(`/api/organizations/${organizationId}/access-permissions`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getAccessPermissions", error, { organizationId });
      throw error;
    }
  },

  updateAccessPermissions: async (organizationId: string, permissions: Array<{ code: string; enabled: boolean; limit?: number | null; usedCount?: number; accessExpiry?: string | null }>) => {
    try {
      const response = await authApi.put(`/api/organizations/${organizationId}/access-permissions`, { permissions });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateAccessPermissions", error, { organizationId });
      throw error;
    }
  },

  // ── Organization Sessions ──────────────────────────────────────────────────

  getOrganizationSessions: async (organizationId: string) => {
    try {
      const response = await authApi.get(`/api/organizations/${organizationId}/sessions`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getOrganizationSessions", error, { organizationId });
      throw error;
    }
  },

  // ── Billing ────────────────────────────────────────────────────────────────

  getBillingSummary: async (organizationId: string) => {
    try {
      const response = await authApi.get(`/api/organizations/${organizationId}/billing`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getBillingSummary", error, { organizationId });
      throw error;
    }
  },

  recordBillingPayment: async (organizationId: string, payload: {
    invoiceId: string;
    amount: number;
    currency?: string;
    paymentDate?: string;
    paymentMethod?: string;
    billingCycle?: string;
    planType?: string;
    paymentStatus?: string;
    nextBillingDate?: string;
    transactionRef?: string;
    notes?: string;
  }) => {
    try {
      const response = await authApi.post(`/api/organizations/${organizationId}/billing/payments`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.recordBillingPayment", error, { organizationId, payload });
      throw error;
    }
  },

  getSessions: async (params?: { search?: string; status?: string; page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/sessions", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getSessions", error, { params });
      throw error;
    }
  },

  createSession: async (sessionData: FormData | Record<string, any>) => {
    const formData = sessionData instanceof FormData ? sessionData : buildFormData(sessionData);

    try {
      const response = await authApi.post("/api/admin/sessions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createSession", error, {
        keys: Array.from(formData.keys()),
      });
      throw error;
    }
  },

  updateSession: async (sessionId: string, sessionData: any) => {
    try {
      const response = await authApi.put(`/api/admin/sessions/${sessionId}`, sessionData);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateSession", error, { sessionId, keys: getObjectKeys(sessionData) });
      throw error;
    }
  },

  deleteSession: async (sessionId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/sessions/${sessionId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteSession", error, { sessionId });
      throw error;
    }
  },

  getActivity: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/activity", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getActivity", error, { params });
      throw error;
    }
  },

  getSession: async (sessionId: string) => {
    try {
      const response = await authApi.get(`/api/admin/sessions/${sessionId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getSession", error, { sessionId });
      throw error;
    }
  },

  getTickets: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/tickets", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getTickets", error, { params });
      throw error;
    }
  },

  // Coupons
  getCoupons: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/coupons", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCoupons", error, { params });
      throw error;
    }
  },

  getCoupon: async (couponId: string) => {
    try {
      const response = await authApi.get(`/api/admin/coupons/${couponId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCoupon", error, { couponId });
      throw error;
    }
  },

  createCoupon: async (payload: {
    name: string;
    code: string;
    discountType: string;
    discountValue: number;
    maxUses?: number;
    status?: string;
  }) => {
    try {
      const response = await authApi.post("/api/admin/coupons", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createCoupon", error, { payload });
      throw error;
    }
  },

  updateCoupon: async (couponId: string, payload: {
    name?: string;
    code?: string;
    discountType?: string;
    discountValue?: number;
    maxUses?: number;
    status?: string;
  }) => {
    try {
      const response = await authApi.put(`/api/admin/coupons/${couponId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateCoupon", error, { couponId, payload });
      throw error;
    }
  },

  deleteCoupon: async (couponId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/coupons/${couponId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteCoupon", error, { couponId });
      throw error;
    }
  },

  // Certificate methods moved to CertificateAPI.admin namespace

  getNotifications: async () => {
    try {
      const response = await authApi.get("/api/admin/dashboard/notifications");
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getNotifications", error);
      throw error;
    }
  },

  // Blogs
  getBlogs: async (params?: { page?: number; limit?: number; status?: string }) => {
    try {
      const response = await authApi.get("/api/admin/blogs", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getBlogs", error, { params });
      throw error;
    }
  },

  createBlog: async (payload: {
    title: string;
    excerpt: string;
    content: string;
    status: string;
    tags?: string[];
    sections?: Array<{
      img: string;
      title: string;
      description: string;
      button?: { label: string; link: string };
    }>;
  }) => {
    try {
      const response = await authApi.post("/api/admin/blogs", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createBlog", error, { payload });
      throw error;
    }
  },

  getBlogById: async (blogId: string) => {
    try {
      const response = await authApi.get(`/api/admin/blogs/${blogId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getBlogById", error, { blogId });
      throw error;
    }
  },

  updateBlog: async (blogId: string, payload: {
    title?: string;
    excerpt?: string;
    content?: string;
    status?: string;
    tags?: string[];
    sections?: Array<{
      img: string;
      title: string;
      description: string;
      button?: { label: string; link: string };
    }>;
  }) => {
    try {
      const response = await authApi.put(`/api/admin/blogs/${blogId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateBlog", error, { blogId, payload });
      throw error;
    }
  },

  deleteBlog: async (blogId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/blogs/${blogId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteBlog", error, { blogId });
      throw error;
    }
  },

  // Tickets
  createTicket: async (payload: { subject: string; description: string; priority?: string; status?: string }) => {
    try {
      const response = await authApi.post("/api/admin/tickets", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createTicket", error, { payload });
      throw error;
    }
  },

  getTicketById: async (ticketId: string) => {
    try {
      const response = await authApi.get(`/api/admin/tickets/${ticketId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getTicketById", error, { ticketId });
      throw error;
    }
  },

  updateTicket: async (ticketId: string, payload: { status?: string; comment?: string }) => {
    try {
      const response = await authApi.put(`/api/admin/tickets/${ticketId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateTicket", error, { ticketId, payload });
      throw error;
    }
  },

  deleteTicket: async (ticketId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/tickets/${ticketId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteTicket", error, { ticketId });
      throw error;
    }
  },

  // ── Analytics ────────────────────────────────────────────────────────────────

  getAnalytics: async (params?: { rangeDays?: number; days?: number; range?: string }) => {
    try {
      const response = await authApi.get("/api/admin/analytics", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getAnalytics", error, { params });
      throw error;
    }
  },

  exportAnalytics: async (params?: { rangeDays?: number; days?: number; range?: string; format?: string }) => {
    try {
      const response = await authApi.get("/api/admin/analytics/export", {
        params,
        responseType: params?.format === "json" ? "json" : "blob",
      });
      return response;
    } catch (error) {
      logApiFailure("AdminAPI.exportAnalytics", error, { params });
      throw error;
    }
  },

  // ── User sub-routes ─────────────────────────────────────────────────────────

  patchUserStatus: async (userId: string, payload: { status: string }) => {
    try {
      const response = await authApi.patch(`/api/admin/users/${userId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.patchUserStatus", error, { userId, payload });
      throw error;
    }
  },

  assignUserSessions: async (userId: string, payload: { sessionIds: string[] }) => {
    try {
      const response = await authApi.post(`/api/admin/users/${userId}/sessions`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.assignUserSessions", error, { userId, payload });
      throw error;
    }
  },

  getUserNotifications: async (userId: string) => {
    try {
      const response = await authApi.get(`/api/admin/users/${userId}/notifications`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getUserNotifications", error, { userId });
      throw error;
    }
  },

  // ── Assignments ─────────────────────────────────────────────────────────────

  getAssignments: async (params?: { page?: number; limit?: number; search?: string; status?: string; sessionId?: string; educatorId?: string }) => {
    try {
      const response = await authApi.get("/api/admin/assignments", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getAssignments", error, { params });
      throw error;
    }
  },

  createAssignment: async (payload: {
    title: string;
    description?: string;
    sessionId?: string;
    dueDate?: string;
    assignedStudents?: string[];
  }) => {
    try {
      const response = await authApi.post("/api/admin/assignments/create", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createAssignment", error, { payload });
      throw error;
    }
  },

  getAssignmentById: async (assignmentId: string) => {
    try {
      const response = await authApi.get(`/api/admin/assignments/${assignmentId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getAssignmentById", error, { assignmentId });
      throw error;
    }
  },

  updateAssignment: async (assignmentId: string, payload: Record<string, any>) => {
    try {
      const response = await authApi.put(`/api/admin/assignments/${assignmentId}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateAssignment", error, { assignmentId, payload });
      throw error;
    }
  },

  deleteAssignment: async (assignmentId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/assignments/${assignmentId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteAssignment", error, { assignmentId });
      throw error;
    }
  },

  // ── CMS ─────────────────────────────────────────────────────────────────────

  getCmsPages: async () => {
    try {
      const response = await authApi.get("/api/cms/pages");
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCmsPages", error);
      throw error;
    }
  },

  getCmsPage: async (pageKey: string) => {
    try {
      const response = await authApi.get(`/api/cms/pages/${pageKey}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCmsPage", error, { pageKey });
      throw error;
    }
  },

  updateCmsPage: async (pageKey: string, payload: {
    pageTitle?: string;
    status?: string;
    sortOrder?: number;
    metadata?: Record<string, any>;
  }) => {
    try {
      const response = await authApi.put(`/api/cms/pages/${pageKey}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateCmsPage", error, { pageKey, payload });
      throw error;
    }
  },

  getCmsSection: async (pageKey: string, sectionKey: string) => {
    try {
      const response = await authApi.get(`/api/cms/pages/${pageKey}/sections/${sectionKey}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCmsSection", error, { pageKey, sectionKey });
      throw error;
    }
  },

  updateCmsSection: async (pageKey: string, sectionKey: string, payload: {
    sectionTitle?: string;
    sortOrder?: number;
    metadata?: Record<string, any>;
    data?: Record<string, any>;
  }) => {
    try {
      const response = await authApi.put(`/api/cms/pages/${pageKey}/sections/${sectionKey}`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.updateCmsSection", error, { pageKey, sectionKey, payload });
      throw error;
    }
  },

  uploadCmsMedia: async (file: File, title?: string, altText?: string) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (title) formData.append("title", title);
      if (altText) formData.append("altText", altText);
      const response = await authApi.post("/api/cms/media", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.uploadCmsMedia", error, { title });
      throw error;
    }
  },

  // ── Contacts ────────────────────────────────────────────────────────────────

  getContacts: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/contacts", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getContacts", error, { params });
      throw error;
    }
  },

  createContact: async (payload: {
    name: string;
    email: string;
    subject: string;
    mobile?: string;
    medical_school_affiliation?: string;
    description?: string;
  }) => {
    try {
      const response = await authApi.post("/api/admin/contacts", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.createContact", error, { payload });
      throw error;
    }
  },

  getContactById: async (contactId: string) => {
    try {
      const response = await authApi.get(`/api/admin/contacts/${contactId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getContactById", error, { contactId });
      throw error;
    }
  },

  deleteContact: async (contactId: string) => {
    try {
      const response = await authApi.delete(`/api/admin/contacts/${contactId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.deleteContact", error, { contactId });
      throw error;
    }
  },

  replyToContact: async (contactId: string, payload: { replySubject: string; replyMessage: string }) => {
    try {
      const response = await authApi.post(`/api/admin/contacts/${contactId}/reply`, payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.replyToContact", error, { contactId, payload });
      throw error;
    }
  },
};

export const CertificateAPI = {
  student: {
    getCertificates: async (): Promise<any> => {
      try {
        const response = await authApi.get("/api/student/certificates", {
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.student.getCertificates", error);
        throw error;
      }
    },

    getCertificateById: async (certificateId: string): Promise<any> => {
      try {
        const response = await authApi.get(`/api/certificate/${certificateId}`, {
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.student.getCertificateById", error, { certificateId });
        throw error;
      }
    },

    downloadCertificate: async (certificateId: string): Promise<any> => {
      try {
        const response = await authApi.get(`/api/certificate/${certificateId}/download`, {
          responseType: "blob",
          withCredentials: true,
        });
        return response;
      } catch (error) {
        logApiFailure("CertificateAPI.student.downloadCertificate", error, { certificateId });
        throw error;
      }
    },
  },

  educator: {
    getCertificates: async (): Promise<any> => {
      try {
        const response = await authApi.get("/api/certificate/educator/list", {
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.educator.getCertificates", error);
        throw error;
      }
    },

    generateCertificate: async (payload: {
      sessionId: string;
      studentId: string;
      studentName: string;
    }): Promise<any> => {
      try {
        const response = await authApi.post("/api/certificate/generate", payload, {
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.educator.generateCertificate", error, { payload });
        throw error;
      }
    },

    revokeCertificate: async (certificateId: string): Promise<any> => {
      try {
        const response = await authApi.post(
          `/api/certificate/${certificateId}/revoke`,
          {},
          { withCredentials: true }
        );
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.educator.revokeCertificate", error, { certificateId });
        throw error;
      }
    },
  },

  admin: {
    getCertificates: async (params?: {
      page?: number;
      limit?: number;
    }): Promise<any> => {
      try {
        const response = await authApi.get("/api/certificate/admin/list", {
          params,
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.admin.getCertificates", error, { params });
        throw error;
      }
    },

    getCertificateById: async (certificateId: string): Promise<any> => {
      try {
        const response = await authApi.get(`/api/certificate/admin/${certificateId}`, {
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.admin.getCertificateById", error, { certificateId });
        throw error;
      }
    },

    verifyCertificate: async (certificateId: string): Promise<any> => {
      try {
        const response = await authApi.get(`/api/certificate/verify/${certificateId}`, {
          withCredentials: true,
        });
        return dataOf(response);
      } catch (error) {
        logApiFailure("CertificateAPI.admin.verifyCertificate", error, { certificateId });
        throw error;
      }
    },
  },
};

