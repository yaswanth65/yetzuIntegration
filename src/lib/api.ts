import Cookies from "js-cookie";
import { api, authApi } from "./axios";

const dataOf = (response: any) => response?.data ?? response;

export const asArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (Array.isArray(value?.data?.list)) return value.data.list;
  if (Array.isArray(value?.data?.items)) return value.data.items;
  if (Array.isArray(value?.data?.session?.list)) return value.data.session.list;
  if (Array.isArray(value?.data?.sessions?.list)) return value.data.sessions.list;
  if (Array.isArray(value?.data?.assignments?.list)) return value.data.assignments.list;
  if (Array.isArray(value?.data?.requests)) return value.data.requests;
  if (Array.isArray(value?.data?.notifications)) return value.data.notifications;
  if (Array.isArray(value?.data?.messages)) return value.data.messages;
  if (Array.isArray(value?.data)) return value.data;
  if (Array.isArray(value?.items)) return value.items;
  if (Array.isArray(value?.list)) return value.list;
  if (Array.isArray(value?.session?.list)) return value.session.list;
  if (Array.isArray(value?.sessions?.list)) return value.sessions.list;
  if (Array.isArray(value?.assignments?.list)) return value.assignments.list;
  if (Array.isArray(value?.requests)) return value.requests;
  if (Array.isArray(value?.courses)) return value.courses;
  if (Array.isArray(value?.assignments)) return value.assignments;
  if (Array.isArray(value?.sessions)) return value.sessions;
  if (Array.isArray(value?.userList)) return value.userList;
  if (Array.isArray(value?.notifications)) return value.notifications;
  if (Array.isArray(value?.educators)) return value.educators;
  if (Array.isArray(value?.students)) return value.students;
  if (Array.isArray(value?.messages)) return value.messages;
  return [];
};

const withUserId = (payload: Record<string, any> = {}) => {
  const userId = Cookies.get("userId");
  return userId ? { ...payload, userId } : payload;
};

export const CourseAPI = {
  getAllCourses: async (params?: { search?: string; minCost?: number; maxCost?: number }) => {
    const response = await api.get("/api/course/v1/courselist", { params });
    return dataOf(response);
  },

  getCourseById: async (courseId: string) => {
    const response = await api.get(`/api/courses/${courseId}`);
    return dataOf(response);
  },
};

export const PaymentAPI = {
  createOrder: async (payload: { amount: number; currency?: string; courseId: string; userId?: string }) => {
    const response = await authApi.post("/api/payment/order", {
      currency: "INR",
      ...withUserId(payload),
    });
    return dataOf(response);
  },
};

export const StudentAPI = {
  getOverview: async () => {
    const response = await authApi.post("/api/student/dashboard/overview", {});
    return dataOf(response);
  },

  getDashboardOverview: async () => {
    const response = await authApi.post("/api/student/dashboard/overview", {});
    return dataOf(response);
  },

  getNotifications: async () => {
    const response = await authApi.get("/api/student/dashboard/notifications");
    return dataOf(response);
  },

  editProfile: async (data: { name?: string; email?: string; mobileno?: string; phone?: string }) => {
    const payload = {
      ...data,
      mobileno: data.mobileno ?? data.phone,
    };
    try {
      const response = await authApi.put("/api/dashboard/updateStudentDetails", payload);
      return dataOf(response);
    } catch (error) {
      const response = await authApi.put("/api/student/edit-profile", payload);
      return dataOf(response);
    }
  },

  getAssignments: async () => {
    try {
      const response = await authApi.get("/api/assignment/studentList");
      return dataOf(response);
    } catch {
      return { success: false, data: [] };
    }
  },

  uploadAssignment: async (formData: FormData) => {
    const response = await authApi.post("/api/assignment/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return dataOf(response);
  },

  submitAssignment: async (assignmentId: string, file: File) => {
    if (!assignmentId || !file) {
      throw new Error("Assignment and file are required.");
    }
    const formData = new FormData();
    formData.append("assignmentId", assignmentId);
    formData.append("file", file);
    const response = await authApi.post("/api/student/assignments/submit", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return dataOf(response);
  },

  addAssignmentComment: async (payload: { assignmentId: string; comment: string }) => {
    const response = await authApi.post("/api/student/assignments/add-comment", payload);
    return dataOf(response);
  },

  rescheduleCourse: async (payload: { courseId: string; reason: string; proposedDate: string }) => {
    if (!payload.courseId || !payload.reason || !payload.proposedDate) {
      throw new Error("Course, reason, and proposed date are required.");
    }
    const response = await authApi.post("/api/student/course/reschedule-request", payload);
    return dataOf(response);
  },

  getChatEducators: async () => {
    const response = await authApi.get("/api/Studentchat/educators");
    return dataOf(response);
  },

  getChatMessages: async (educatorId: string) => {
    const response = await authApi.post("/api/Studentchat/messages", { educatorId });
    return dataOf(response);
  },

  sendChatMessage: async (educatorId: string, content: string) => {
    const response = await authApi.post("/api/Studentchat/send", { educatorId, content });
    return dataOf(response);
  },
};

export const EducatorAPI = {
  getOverview: async () => {
    const response = await authApi.post("/api/educator/overview", {});
    return dataOf(response);
  },

  getMySessions: async () => {
    const response = await authApi.get("/api/educator/sessions", {
      params: { page: 1, limit: 100 },
    });
    return dataOf(response);
  },

  getSessions: async () => {
    const response = await authApi.get("/api/educator/sessions", {
      params: { page: 1, limit: 100 },
    });
    return dataOf(response);
  },

  getRescheduleRequests: async () => {
    const overview = await authApi.post("/api/educator/overview", {});
    const sessions = await authApi.get("/api/educator/sessions");
    
    const overviewData = dataOf(overview);
    const sessionsData = dataOf(sessions);
    
    const rescheduleRequests = [];
    if (sessionsData?.list) {
      for (const session of sessionsData.list) {
        if (session.rescheduleRequests) {
          rescheduleRequests.push(...session.rescheduleRequests);
        }
      }
    }
    
    return {
      list: rescheduleRequests,
      fromOverview: overviewData
    };
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
    const response = await authApi.post("/api/educator/reschedule/action", body);
    return dataOf(response);
  },

  createAssignment: async (formData: FormData) => {
    for (const field of ["title", "description", "dueDate"]) {
      if (!formData.get(field)) throw new Error(`${field} is required.`);
    }
    const userId = Cookies.get("userId");
    if (userId) formData.append("userId", userId);
    const response = await authApi.post("/api/educator/assignments/create", formData);
    return dataOf(response);
  },

  getAssignments: async () => {
    const response = await authApi.post("/api/educator/assignments/list", {
      status: "published",
    });
    return dataOf(response);
  },

  getPendingSubmissions: async () => {
    const overview = await authApi.post("/api/educator/overview", {});
    const overviewData = dataOf(overview);
    
    return {
      list: overviewData?.pending?.list || [],
      alerts: overviewData?.alerts?.list || []
    };
  },

  reviewSubmission: async (payload: { submissionId: string; status: string; educatorRemark: string }) => {
    const response = await authApi.post("/api/educator/submissions/review", payload);
    return dataOf(response);
  },
};

export const EducatorChatAPI = {
  getStudents: async () => {
    const response = await authApi.get("/api/Educatorchat/students");
    return dataOf(response);
  },

  getMessages: async (studentId: string) => {
    const response = await authApi.post("/api/Educatorchat/messages", { studentId });
    return dataOf(response);
  },

  sendMessage: async (studentId: string, content: string) => {
    const response = await authApi.post("/api/Educatorchat/send", { studentId, content });
    return dataOf(response);
  },
};

export const AdminAPI = {
  getOverview: async () => {
    const response = await authApi.get("/api/admin/overview");
    return dataOf(response);
  },

  getUsers: async (params?: { search?: string; status?: string; role?: string; page?: number; limit?: number }) => {
    const response = await authApi.get("/api/admin/users", { params });
    return dataOf(response);
  },

  createUser: async (payload: { name: string; email: string; role: string; password?: string }) => {
    if (!payload.name || !payload.email || !payload.role) {
      throw new Error("Name, email, and role are required.");
    }
    const response = await authApi.post("/api/admin/users", payload);
    return dataOf(response);
  },

  updateUser: async (payload: { userId: string; name?: string; email?: string; status?: string; role?: string }) => {
    const { userId, ...body } = payload;
    const response = await authApi.put(`/api/admin/users/${userId}`, body);
    return dataOf(response);
  },

  deleteUser: async (userId: string) => {
    const response = await authApi.delete(`/api/admin/users/${userId}`);
    return dataOf(response);
  },

  getSessions: async (params?: { search?: string; status?: string; page?: number; limit?: number }) => {
    const response = await authApi.get("/api/admin/sessions", { params });
    return dataOf(response);
  },

  getActivity: async (params?: { page?: number; limit?: number }) => {
    const response = await authApi.get("/api/admin/activity", { params });
    return dataOf(response);
  },

  getTickets: async (params?: { page?: number; limit?: number }) => {
    const response = await authApi.get("/api/admin/tickets", { params });
    return dataOf(response);
  },
};
