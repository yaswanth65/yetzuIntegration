const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://productionyetzuapi.yetzu.com';

const getHeaders = (token: string | null, customHeaders: Record<string, string> = {}) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  
    headers['Authorization'] = `Bearer ${token}`;
    // headers['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJiOGIwYWE1My1mNzlhLTQxZDUtODdmZi05YTM3NGJmOWZjNmYiLCJlbWFpbCI6ImFiaGlyYW10ZW1wQGdtYWlsLmNvbSIsInJvbGUiOiJzdHVkZW50IiwiaWF0IjoxNzczNjU5NjkxLCJleHAiOjE3NzM3MDI4OTF9.SW34FFo5GzYmsry65FBi88r6IWqaq3QZpop-A6o0ztE`;
  
  return headers;
};

export const StudentAPI = {
  getOverview: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/student/dashboard/overview`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': "b8b0aa53-f79a-41d5-87ff-9a374bf9fc6f" }),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch student overview data');
    }

    return response.json();
  },

  updateDetails: async (token: string, data: { name: string; mobileno: string }) => {
    const response = await fetch(`${BASE_URL}/api/dashboard/updateStudentDetails`, {
      method: 'PUT',
      headers: getHeaders(token),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update student details');
    }

    return response.json();
  },

  getNotifications: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/student/dashboard/notifications`, {
      method: 'GET',
      headers: getHeaders(token, { 'x-user-id': userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    return response.json();
  },

  editProfile: async (token: string, userId: string, data: { name: string; email: string; mobileno: string }) => {
    const response = await fetch(`${BASE_URL}/api/student/edit-profile`, {
      method: 'PUT',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error("Backend Error Details:", errorBody);
      throw new Error(errorBody.message || 'Failed to update student details');
    }

    return response.json();
  },

  getChatEducators: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/Studentchat/educators`, {
      method: 'GET',
      headers: getHeaders(token, { 'x-user-id': userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch educators');
    }

    return response.json();
  },

  getChatMessages: async (token: string, userId: string, educatorId: string) => {
    const response = await fetch(`${BASE_URL}/api/Studentchat/messages`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({ educatorId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  },

  sendChatMessage: async (token: string, userId: string, educatorId: string, content: string) => {
    const response = await fetch(`${BASE_URL}/api/Studentchat/send`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({ educatorId, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },
  rescheduleCourse: async (token: string, userId: string, payload: { courseId: string; reason: string; proposedDate: string }) => {
    const response = await fetch(`${BASE_URL}/api/student/course/reschedule-request`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to submit reschedule request');
    }

    return response.json();
  }
};

export const CourseAPI = {
    getAllCourses: async () => {
      const response = await fetch(`${BASE_URL}/api/course/v1/courselist`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
  
      return response.json();
    },
  
    getCourseById: async (courseId: string) => {
      const response = await fetch(`${BASE_URL}/api/course/v1/get/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch course details');
      }
  
      return response.json();
    }
  };

export const EducatorAPI = {
  getOverview: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/educator/overview`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch educator overview');
    }

    return response.json();
  },

  getMySessions: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/educator/my-session`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch educator sessions');
    }

    return response.json();
  },

  handleRescheduleAction: async (
    token: string, 
    userId: string, 
    payload: { 
      courseId: string; 
      requestId: string; 
      action: 'approved' | 'rejected'; 
      educatorRemark: string 
    }
  ) => {
    const response = await fetch(`${BASE_URL}/api/educator/reschedule-action`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to handle reschedule action');
    }

    return response.json();
  },

  createAssignment: async (
    token: string, 
    userId: string, 
    formData: FormData
  ) => {
    const response = await fetch(`${BASE_URL}/api/educator/assignments/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-user-id': userId,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to create assignment');
    }

    return response.json();
  },

  getAssignments: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/educator/assignments/list`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }

    return response.json();
  },
};

export const EducatorChatAPI = {
  getStudents: async (token: string, userId: string) => {
    const response = await fetch(`${BASE_URL}/api/Educatorchat/students`, {
      method: 'GET',
      headers: getHeaders(token, { 'x-user-id': userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    return response.json();
  },

  getMessages: async (token: string, userId: string, studentId: string) => {
    const response = await fetch(`${BASE_URL}/api/Educatorchat/messages`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({ studentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  },

  sendMessage: async (token: string, userId: string, studentId: string, content: string) => {
    const response = await fetch(`${BASE_URL}/api/Educatorchat/send`, {
      method: 'POST',
      headers: getHeaders(token, { 'x-user-id': userId }),
      body: JSON.stringify({ studentId, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },
};