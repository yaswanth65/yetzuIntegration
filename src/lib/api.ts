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

export const PaymentAPI = {
  createOrder: async (payload: { amount: number; currency?: string; sessionId: string; userId?: string }) => {
    try {
      const userId = getUserId();
      const body = {
        amount: payload.amount,
        currency: payload.currency || "INR",
        sessionId: payload.sessionId,
        userId: userId
      };
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
              amount: payload.amount * 100, // Convert to paise
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

      const response = await authApi.post("/api/payment/webhook", body, {
        headers: {
          "x-webhook-test-token": "TqSxD9F3-ru7ZCt"
        }
      });
      return dataOf(response);
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

  getDashboardOverview: async () => {
    // getOverview returns 500 - use me() instead
    return StudentAPI.me();
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
      const response = await authApi.get("/api/certificate/student", {
        withCredentials: true, // Send cookies automatically (interceptor adds headers)
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getCertificates", error);
      throw error;
    }
  },

  getCertificateById: async (certificateId: string) => {
    try {
      const response = await authApi.get(`/api/certificate/${certificateId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getCertificateById", error, { certificateId });
      throw error;
    }
  },

  // Blogs (public - no auth required)
  getBlogs: async () => {
    try {
      const response = await api.get("/api/blogs");
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getBlogs", error);
      throw error;
    }
  },

  getBlogById: async (blogId: string) => {
    try {
      const response = await api.get(`/api/blogs/${blogId}`);
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

  downloadCertificate: async (certificateId: string) => {
    try {
      const response = await authApi.get(`/api/certificate/${certificateId}/download`, {
        responseType: 'blob'
      });
      return response;
    } catch (error) {
      logApiFailure("StudentAPI.downloadCertificate", error, { certificateId });
      throw error;
    }
  },

  editProfile: async (data: { name?: string; email?: string; mobileno?: string; phone?: string }) => {
    const payload = {
      ...data,
      mobileno: data.mobileno ?? data.phone,
    };

    try {
      const response = await authApi.put("/api/dashboard/updateStudentDetails", payload);
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("StudentAPI.editProfile.primary", primaryError, { payload });
      try {
        const fallback = await authApi.put("/api/student/edit-profile", payload);
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
        withCredentials: true, // Send cookies automatically (interceptor adds Authorization + x-user-id)
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getAssignments", error);
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
      const response = await authApi.post("/api/Studentchat/messages", { educatorId });
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
      logApiFailure("EducatorAPI.getRescheduleRequests.primary", error);
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
      const response = await authApi.post("/api/educator/reschedule/action", body);
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

  // 🔥 TEMP FIX: map sessionId → courseId
  if (sessionId && !courseId) {
    formData.set("courseId", sessionId as string);
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

    try {
      const fallback = await authApi.post(
        "/api/educator/assignment/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return dataOf(fallback);
    } catch (fallbackError) {
      logApiFailure("EducatorAPI.createAssignment.fallback", fallbackError, {
        keys: Array.from(formData.keys()),
      });
      throw fallbackError;
    }
  }
},

  // POST /api/educator/assignments/list (from Postman: status=published)
  getAssignments: async () => {
    try {
      const response = await authApi.post("/api/educator/assignments/list", {
        status: "published",
      }, {
        withCredentials: true,
      });
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("EducatorAPI.getAssignments.primary", primaryError);
      try {
        const fallback = await authApi.post("/api/educator/assignment/list", {
          status: "published",
        }, {
          withCredentials: true,
        });
        return dataOf(fallback);
      } catch (fallbackError) {
        logApiFailure("EducatorAPI.getAssignments.fallback", fallbackError);
        throw fallbackError;
      }
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

  getCertificates: async () => {
    try {
      const response = await authApi.get("/api/certificate/educator/list");
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getCertificates", error);
      throw error;
    }
  },

  generateCertificate: async (payload: { sessionId: string; studentId: string; studentName: string }) => {
    try {
      const response = await authApi.post("/api/certificate/generate", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.generateCertificate", error, { payload });
      throw error;
    }
  },

  revokeCertificate: async (certificateId: string) => {
    try {
      const response = await authApi.post(`/api/certificate/${certificateId}/revoke`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.revokeCertificate", error, { certificateId });
      throw error;
    }
  },

  updateAssignmentStatus: async (payload: { assignmentId: string; status: string }) => {
    try {
      const response = await authApi.post("/api/educator/assignments/status", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.updateAssignmentStatus", error, { payload });
      throw error;
    }
  },

  uploadSessionResource: async (sessionId: string, formData: FormData) => {
    try {
      const response = await authApi.post(`/api/educator/sessions/${sessionId}/resources`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.uploadSessionResource", error, { sessionId });
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

  getNotifications: async () => {
    try {
      const response = await authApi.get("/api/educator/notifications");
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getNotifications", error);
      throw error;
    }
  },
};

export const EducatorChatAPI = {
  getStudents: async () => {
    try {
      const response = await authApi.get("/api/Educatorchat/students");
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorChatAPI.getStudents", error);
      throw error;
    }
  },

  getMessages: async (studentId: string) => {
    try {
      const response = await authApi.post("/api/Educatorchat/messages", { studentId });
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorChatAPI.getMessages", error, { studentId });
      throw error;
    }
  },

  sendMessage: async (studentId: string, content: string) => {
    try {
      const response = await authApi.post("/api/Educatorchat/send", { studentId, content });
      return dataOf(response);
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

  createUser: async (payload: { name: string; email: string; role: string; password?: string }) => {
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

  updateUser: async (payload: { userId: string; name?: string; email?: string; status?: string; role?: string }) => {
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

  getCertificates: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/certificate/admin/list", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCertificates", error, { params });
      throw error;
    }
  },

  getCertificateById: async (certificateId: string) => {
    try {
      const response = await authApi.get(`/api/certificate/admin/${certificateId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getCertificateById", error, { certificateId });
      throw error;
    }
  },

  verifyCertificate: async (certificateId: string) => {
    try {
      const response = await authApi.get(`/api/certificate/verify/${certificateId}`);
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.verifyCertificate", error, { certificateId });
      throw error;
    }
  },

  getNotifications: async () => {
    try {
      const response = await authApi.get("/api/admin/notifications");
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

  createBlog: async (payload: { title: string; excerpt: string; content: string; status: string; tags?: string[] }) => {
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

  updateBlog: async (blogId: string, payload: { title?: string; excerpt?: string; content?: string; status?: string; tags?: string[] }) => {
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
};

