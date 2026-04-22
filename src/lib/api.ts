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
  getOverview: async () => {
    const response = await fetch(`${BASE_URL}/api/educator/overview`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch educator overview');
    }

    return response.json();
  },

  getMySessions: async () => {
    const response = await fetch(`${BASE_URL}/api/educator/my-session`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch educator sessions');
    }

    return response.json();
  },

  handleRescheduleAction: async (payload: { 
    courseId: string; 
    requestId: string; 
    action: 'approved' | 'rejected'; 
    educatorRemark: string 
  }) => {
    const response = await fetch(`${BASE_URL}/api/educator/reschedule-action`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to handle reschedule action');
    }

    return response.json();
  },

  createAssignment: async (formData: FormData) => {
    const token = Cookies.get("jwtToken");
    const userId = Cookies.get("userId");

    const response = await fetch(`${BASE_URL}/api/educator/assignments/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-user-id': userId || '',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to create assignment');
    }

    return response.json();
  },

  getAssignments: async () => {
    const response = await fetch(`${BASE_URL}/api/educator/assignments/list`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch assignments');
    }

    return response.json();
  },
};

export const EducatorChatAPI = {
  getStudents: async () => {
    const response = await fetch(`${BASE_URL}/api/Educatorchat/students`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch students');
    }

    return response.json();
  },

  getMessages: async (studentId: string) => {
    const response = await fetch(`${BASE_URL}/api/Educatorchat/messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ studentId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  },

  sendMessage: async (studentId: string, content: string) => {
    const response = await fetch(`${BASE_URL}/api/Educatorchat/send`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ studentId, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },
};

export const AdminAPI = {
  getOverview: async () => {
    const response = await fetch(`${BASE_URL}/api/admin/dashboard/overview`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch admin overview');
    }

    return response.json();
  },
};

export const StudentAPI = {
  getOverview: async () => ({ success: false, data: {} } as any),
  getNotifications: async () => ({ success: false, data: {} } as any),
  editProfile: async (data: any) => ({ success: false, data: {} } as any),
  getAssignments: async () => ({ data: [] } as any),
  getChatEducators: async () => ({ data: [], educators: [] } as any),
};