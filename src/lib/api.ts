import Cookies from "js-cookie";
import { AxiosError } from "axios";
import { api, authApi, getJwtUserId } from "./axios";

const dataOf = (response: any) => response?.data ?? response;

const getObjectKeys = (value: any): string[] =>
  value && typeof value === "object" ? Object.keys(value).slice(0, 12) : [];

const isFileLike = (value: any): boolean =>
  typeof File !== "undefined" && value instanceof File;

const getUserId = (): string => getJwtUserId(Cookies.get("jwtToken")) || Cookies.get("userId") || "";

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

const overviewAssignmentFallback = async () => {
  const overview = await authApi.post("/api/student/dashboard/overview", {});
  const data = dataOf(overview);
  const list =
    asArray(data?.data?.pendingAssignments) ||
    asArray(data?.data?.dueAssignments) ||
    asArray(data?.pendingAssignments) ||
    asArray(data?.dueAssignments);

  return {
    success: false,
    message: "Student assignment list endpoint failed. Using dashboard fallback.",
    data: list,
  };
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
  createOrder: async (payload: { amount: number; currency?: string; courseId: string; userId?: string }) => {
    try {
      const response = await authApi.post("/api/payment/order", {
        currency: "INR",
        ...withUserId(payload),
      });
      return dataOf(response);
    } catch (error) {
      logApiFailure("PaymentAPI.createOrder", error, { payload });
      throw error;
    }
  },
};

export const StudentAPI = {
  getOverview: async () => {
    try {
      const response = await authApi.post("/api/student/dashboard/overview", {});
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getOverview", error);
      throw error;
    }
  },

  getDashboardOverview: async () => {
    return StudentAPI.getOverview();
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
      const response = await authApi.get("/api/student/dashboard/notifications");
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getNotifications", error);
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

  getAssignments: async () => {
    try {
      const response = await authApi.get("/api/assignment/studentList");
      return dataOf(response);
    } catch (error) {
      logApiFailure("StudentAPI.getAssignments.primary", error);
      try {
        return await overviewAssignmentFallback();
      } catch (fallbackError) {
        logApiFailure("StudentAPI.getAssignments.fallback", fallbackError);
        return { success: false, data: [] };
      }
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

  submitAssignment: async (assignmentId: string, file: File) => {
    if (!assignmentId || !file) {
      throw new Error("Assignment and file are required.");
    }

    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("file", file);

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

  getOverview: async () => {
    try {
      const response = await authApi.post("/api/educator/overview", {});
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.getOverview", error);
      throw error;
    }
  },

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
      const [overview, sessions] = await Promise.all([EducatorAPI.getOverview(), EducatorAPI.getSessions()]);
      const requests = [
        ...asArray(overview?.data?.requests || overview?.requests),
        ...asArray(sessions).flatMap((session: any) => asArray(session?.rescheduleRequests)),
      ];

      return {
        success: false,
        message: "Reschedule list endpoint unavailable. Using session-derived fallback.",
        data: {
          list: requests,
          count: requests.length,
        },
      };
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

    if (!formData.get("sessionId") && !formData.get("courseId")) {
      throw new Error("sessionId or courseId is required.");
    }

    try {
      const response = await authApi.post("/api/educator/assignments/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("EducatorAPI.createAssignment.primary", primaryError, {
        keys: Array.from(formData.keys()),
      });
      try {
        const fallback = await authApi.post("/api/educator/assignment/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        return dataOf(fallback);
      } catch (fallbackError) {
        logApiFailure("EducatorAPI.createAssignment.fallback", fallbackError, {
          keys: Array.from(formData.keys()),
        });
        throw fallbackError;
      }
    }
  },

  getAssignments: async () => {
    try {
      const response = await authApi.post("/api/educator/assignments/list", {
        status: "published",
      });
      return dataOf(response);
    } catch (primaryError) {
      logApiFailure("EducatorAPI.getAssignments.primary", primaryError);
      try {
        const fallback = await authApi.post("/api/educator/assignment/list", {
          status: "published",
        });
        return dataOf(fallback);
      } catch (fallbackError) {
        logApiFailure("EducatorAPI.getAssignments.fallback", fallbackError);
        throw fallbackError;
      }
    }
  },

  getAssignmentById: async (id: string) => {
    const response = await EducatorAPI.getAssignments();
    const match = asArray(response).find(
      (assignment: any) =>
        String(assignment.id || assignment._id || assignment.assignmentId) === String(id),
    );

    if (!match) {
      throw new Error(`Assignment ${id} not found in educator assignment list.`);
    }

    return match;
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

  updateAssignmentStatus: async (payload: { assignmentId: string; status: string }) => {
    try {
      const response = await authApi.post("/api/educator/assignments/status", payload);
      return dataOf(response);
    } catch (error) {
      logApiFailure("EducatorAPI.updateAssignmentStatus", error, { payload });
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
  getOverview: async () => {
    try {
      const response = await authApi.get("/api/admin/overview");
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getOverview.primary", error);
      const [users, sessions] = await Promise.all([
        AdminAPI.getUsers({ page: 1, limit: 100 }),
        AdminAPI.getSessions({ page: 1, limit: 100 }),
      ]);
      const userList = asArray(users);
      const sessionList = asArray(sessions);

      return {
        success: false,
        message: "Admin overview endpoint unavailable. Using users and sessions fallback.",
        data: {
          cards: {
            activeStudents: userList.filter((user: any) => user.role === "student" || user.Role === "student").length,
            activeEducators: userList.filter((user: any) => user.role === "educator" || user.Role === "educator").length,
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

  getTickets: async (params?: { page?: number; limit?: number }) => {
    try {
      const response = await authApi.get("/api/admin/tickets", { params });
      return dataOf(response);
    } catch (error) {
      logApiFailure("AdminAPI.getTickets", error, { params });
      throw error;
    }
  },
};
