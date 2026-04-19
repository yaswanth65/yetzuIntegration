// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://productionyetzuapi.yetzu.com';

// const getHeaders = (token: string | null, customHeaders: Record<string, string> = {}) => {
//   const headers: HeadersInit = {
//     'Content-Type': 'application/json',
//     ...customHeaders,
//   };
  
//     headers['Authorization'] = `Bearer ${token}`;
   
//   return headers;
// };

// export const StudentAPI = {
//   getOverview: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/student/dashboard/overview`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({}),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch student overview data');
//     }

//     return response.json();
//   },

//   updateDetails: async (token: string, data: { name: string; mobileno: string }) => {
//     const response = await fetch(`${BASE_URL}/api/dashboard/updateStudentDetails`, {
//       method: 'PUT',
//       headers: getHeaders(token),
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to update student details');
//     }

//     return response.json();
//   },

//   getNotifications: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/student/dashboard/notifications`, {
//       method: 'GET',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch notifications');
//     }

//     return response.json();
//   },

//   editProfile: async (token: string, userId: string, data: { name: string; email: string; mobileno: string }) => {
//     const response = await fetch(`${BASE_URL}/api/student/edit-profile`, {
//       method: 'PUT',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify(data),
//     });

//     if (!response.ok) {
//       const errorBody = await response.json().catch(() => ({}));
//       console.error("Backend Error Details:", errorBody);
//       throw new Error(errorBody.message || 'Failed to update student details');
//     }

//     return response.json();
//   },

//   getChatEducators: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/Studentchat/educators`, {
//       method: 'GET',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch educators');
//     }

//     return response.json();
//   },

//   getChatMessages: async (token: string, userId: string, educatorId: string) => {
//     const response = await fetch(`${BASE_URL}/api/Studentchat/messages`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({ educatorId }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch messages');
//     }

//     return response.json();
//   },

//   sendChatMessage: async (token: string, userId: string, educatorId: string, content: string) => {
//     const response = await fetch(`${BASE_URL}/api/Studentchat/send`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({ educatorId, content }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send message');
//     }

//     return response.json();
//   },
//   rescheduleCourse: async (token: string, userId: string, payload: { courseId: string; reason: string; proposedDate: string }) => {
//     const response = await fetch(`${BASE_URL}/api/student/course/reschedule-request`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorBody = await response.json().catch(() => ({}));
//       throw new Error(errorBody.message || 'Failed to submit reschedule request');
//     }

//     return response.json();
//   }
// };

// export const CourseAPI = {
//     getAllCourses: async () => {
//       const response = await fetch(`${BASE_URL}/api/course/v1/courselist`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch courses');
//       }
  
//       return response.json();
//     },
  
//     getCourseById: async (courseId: string) => {
//       const response = await fetch(`${BASE_URL}/api/course/v1/get/${courseId}`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to fetch course details');
//       }
  
//       return response.json();
//     }
//   };

// export const EducatorAPI = {
//   getOverview: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/educator/overview`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({}),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch educator overview');
//     }

//     return response.json();
//   },

//   getMySessions: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/educator/my-session`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({}),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch educator sessions');
//     }

//     return response.json();
//   },

//   handleRescheduleAction: async (
//     token: string, 
//     userId: string, 
//     payload: { 
//       courseId: string; 
//       requestId: string; 
//       action: 'approved' | 'rejected'; 
//       educatorRemark: string 
//     }
//   ) => {
//     const response = await fetch(`${BASE_URL}/api/educator/reschedule-action`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify(payload),
//     });

//     if (!response.ok) {
//       const errorBody = await response.json().catch(() => ({}));
//       throw new Error(errorBody.message || 'Failed to handle reschedule action');
//     }

//     return response.json();
//   },

//   createAssignment: async (
//     token: string, 
//     userId: string, 
//     formData: FormData
//   ) => {
//     const response = await fetch(`${BASE_URL}/api/educator/assignments/create`, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'x-user-id': userId,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorBody = await response.json().catch(() => ({}));
//       throw new Error(errorBody.message || 'Failed to create assignment');
//     }

//     return response.json();
//   },

//   getAssignments: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/educator/assignments/list`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({}),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch assignments');
//     }

//     return response.json();
//   },
// };

// export const EducatorChatAPI = {
//   getStudents: async (token: string, userId: string) => {
//     const response = await fetch(`${BASE_URL}/api/Educatorchat/students`, {
//       method: 'GET',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch students');
//     }

//     return response.json();
//   },

//   getMessages: async (token: string, userId: string, studentId: string) => {
//     const response = await fetch(`${BASE_URL}/api/Educatorchat/messages`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({ studentId }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to fetch messages');
//     }

//     return response.json();
//   },

//   sendMessage: async (token: string, userId: string, studentId: string, content: string) => {
//     const response = await fetch(`${BASE_URL}/api/Educatorchat/send`, {
//       method: 'POST',
//       headers: getHeaders(token, { 'x-user-id': userId }),
//       body: JSON.stringify({ studentId, content }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to send message');
//     }

//     return response.json();
//   },
// };

// api.ts

import Cookies from "js-cookie";
import { getApiBaseUrl } from "@/lib/getApiBaseUrl";

const BASE_URL = getApiBaseUrl();

const getHeaders = (customHeaders: Record<string, string> = {}) => {
  const token = Cookies.get("jwtToken");
  const userId = Cookies.get("userId");

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (userId && !headers['x-user-id']) {
    headers['x-user-id'] = userId;
  }
   
  return headers;
};

export const AuthAPI = {
  getMe: async () => {
    const response = await fetch(`${BASE_URL}/api/identityapi/v1/auth/me`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile information');
    }

    const data = await response.json();
    
    if (data?.user?.id) {
      Cookies.set("userId", data.user.id, { secure: true, sameSite: "strict" });
    }

    return data;
  }
};

export const StudentAPI = {
  getOverview: async () => {
    const response = await fetch(`${BASE_URL}/api/student/dashboard/overview`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch student overview data');
    }

    return response.json();
  },

  updateDetails: async (data: { name: string; mobileno: string }) => {
    const response = await fetch(`${BASE_URL}/api/dashboard/updateStudentDetails`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update student details');
    }

    return response.json();
  },

  getNotifications: async () => {
    const response = await fetch(`${BASE_URL}/api/student/dashboard/notifications`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    return response.json();
  },

  editProfile: async (data: { name: string; email: string; mobileno: string }) => {
    const response = await fetch(`${BASE_URL}/api/student/edit-profile`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to update student details');
    }

    return response.json();
  },

  getChatEducators: async () => {
    const response = await fetch(`${BASE_URL}/api/Studentchat/educators`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch educators');
    }

    return response.json();
  },

  getChatMessages: async (educatorId: string) => {
    const response = await fetch(`${BASE_URL}/api/Studentchat/messages`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ educatorId }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }

    return response.json();
  },

  sendChatMessage: async (educatorId: string, content: string) => {
    const response = await fetch(`${BASE_URL}/api/Studentchat/send`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ educatorId, content }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message');
    }

    return response.json();
  },
  
  rescheduleCourse: async (payload: { courseId: string; reason: string; proposedDate: string }) => {
    const response = await fetch(`${BASE_URL}/api/student/course/reschedule-request`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to submit reschedule request');
    }

    return response.json();
  },

  getAssignments: async () => {
    const token = Cookies.get("jwtToken");
    const userId = Cookies.get("userId");

    // Constructing headers manually to exactly match the cURL documentation
    // and prevent 'x-user-id' from being attached.
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (userId) {
      headers['userid'] = userId; // Using exact key from docs
    }
    const response = await fetch(`${BASE_URL}/api/assignment/studentList`, {
      method: 'GET',
      headers: headers ,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch student assignments');
    }

    return response.json();
  },

  submitAssignment: async (formData: FormData) => {
    const token = Cookies.get("jwtToken");
    const userId = Cookies.get("userId");

    const response = await fetch(`${BASE_URL}/api/student/assignments/submit`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'x-user-id': userId || '',
      },
      body: formData,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to submit assignment');
    }

    return response.json();
  },

  addAssignmentComment: async (payload: { assignmentId: string; comment: string }) => {
    const response = await fetch(`${BASE_URL}/api/student/assignments/add-comment`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(errorBody.message || 'Failed to add assignment comment');
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