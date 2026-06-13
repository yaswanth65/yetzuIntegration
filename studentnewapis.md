{
  "info": {
    "_postman_id": "asterisks-edu-student-public-session-metadata-01",
    "name": "Asterisks Edu Student + Public APIs",
    "description": "Focused collection for student APIs, public APIs, legacy student helpers, and admin session metadata add/update flows.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Sign In",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/signin",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "signin"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"student@yetzu.com\",\n  \"password\": \"SecurePass@123\"\n}"
            }
          }
        },
        {
          "name": "Sign Up",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/signup",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "signup"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"New Student\",\n  \"email\": \"new.student@example.com\",\n  \"password\": \"SecurePass@123\",\n  \"role\": \"student\"\n}"
            }
          }
        },
        {
          "name": "Verify OTP",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/verify-otp",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "verify-otp"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"new.student@example.com\",\n  \"otp\": \"123456\"\n}"
            }
          }
        },
        {
          "name": "Refresh Token",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/refresh",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "refresh"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"refreshToken\": \"{{refreshToken}}\"\n}"
            }
          }
        },
        {
          "name": "Me",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/me",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "me"
              ]
            }
          }
        },
        {
          "name": "Forgot Password",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/forgot-password",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "forgot-password"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"student@yetzu.com\"\n}"
            }
          }
        },
        {
          "name": "Reset Password",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/reset-password",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "reset-password"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"token\": \"{{resetToken}}\",\n  \"password\": \"SecurePass@123\"\n}"
            }
          }
        },
        {
          "name": "Sign Out",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/identityapi/v1/auth/signout",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "identityapi",
                "v1",
                "auth",
                "signout"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"userId\": \"{{studentUserId}}\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Public APIs",
      "item": [
        {
          "name": "List Public Blogs",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/public/blogs",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "public",
                "blogs"
              ]
            }
          }
        },
        {
          "name": "Get Public Blog",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/public/blogs/{{blogId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "public",
                "blogs",
                "{{blogId}}"
              ]
            }
          }
        },
        {
          "name": "List Public Sessions",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/public/sessions",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "public",
                "sessions"
              ],
              "query": [
                {
                  "key": "status",
                  "value": "all"
                },
                {
                  "key": "search",
                  "value": ""
                }
              ]
            }
          }
        },
        {
          "name": "Get Public Session",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/public/sessions/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "public",
                "sessions",
                "{{sessionId}}"
              ]
            }
          }
        },
        {
          "name": "List Public CMS Pages",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/public/cms/pages",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "public",
                "cms",
                "pages"
              ]
            }
          }
        },
        {
          "name": "Get Public CMS Page",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/public/cms/pages/{{cmsPageKey}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "public",
                "cms",
                "pages",
                "{{cmsPageKey}}"
              ]
            }
          }
        },
        {
          "name": "Submit Contact Form",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/form/v1/contact",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "form",
                "v1",
                "contact"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"subject\": \"Admissions query\",\n  \"mobile\": \"9876543210\",\n  \"medical_school_affiliation\": \"ABC Medical College\",\n  \"description\": \"I want to know about the admission process.\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Student Core",
      "item": [
        {
          "name": "Dashboard Overview",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/dashboard/overview",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "dashboard",
                "overview"
              ]
            }
          }
        },
        {
          "name": "Dashboard Notifications",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/dashboard/notifications",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "dashboard",
                "notifications"
              ]
            }
          }
        },
        {
          "name": "Enrolled Courses and Sessions",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/courses/enrolled",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "courses",
                "enrolled"
              ]
            }
          }
        },
        {
          "name": "Update Student Profile",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/edit-profile",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "edit-profile"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Student\",\n  \"email\": \"student@yetzu.com\",\n  \"mobileno\": \"+919900000007\"\n}"
            }
          }
        },
        {
          "name": "Session Detail",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/session/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "session",
                "{{sessionId}}"
              ]
            }
          }
        },
        {
          "name": "Request Session Reschedule",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/session/reschedule-request",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "session",
                "reschedule-request"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"sessionId\": \"{{sessionId}}\",\n  \"reason\": \"I have a university exam on that day.\",\n  \"proposedDate\": \"2026-05-25T10:00:00.000Z\"\n}"
            }
          }
        },
        {
          "name": "Request Course Reschedule",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/course/reschedule-request",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "course",
                "reschedule-request"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"courseId\": \"{{courseId}}\",\n  \"reason\": \"I have a university exam on that day.\",\n  \"proposedDate\": \"2026-05-25T10:00:00.000Z\"\n}"
            }
          }
        },
        {
          "name": "Student Certificates",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/certificates",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "certificates"
              ]
            }
          }
        },
        {
          "name": "Help Articles",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/help/articles",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "help",
                "articles"
              ]
            }
          }
        },
        {
          "name": "Invoice Download",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/invoices/{{invoiceId}}/download",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "invoices",
                "{{invoiceId}}",
                "download"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Student Assignments",
      "item": [
        {
          "name": "List Assignments",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/assignments",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "assignments"
              ]
            }
          }
        },
        {
          "name": "Get Assignment Detail",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/assignments/{{assignmentId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "assignments",
                "{{assignmentId}}"
              ]
            }
          }
        },
        {
          "name": "Submit Assignment",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/assignments/submit",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "assignments",
                "submit"
              ]
            },
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "assignmentId",
                  "value": "{{assignmentId}}",
                  "type": "text"
                },
                {
                  "key": "comment",
                  "value": "Submitting my first draft.",
                  "type": "text"
                },
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                }
              ]
            }
          }
        },
        {
          "name": "Add Private Comment",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/assignments/add-comment",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "assignments",
                "add-comment"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"assignmentId\": \"{{assignmentId}}\",\n  \"comment\": \"This is a private note before submission.\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Student Tickets",
      "item": [
        {
          "name": "List Tickets",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/tickets",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "tickets"
              ]
            }
          }
        },
        {
          "name": "Create Ticket",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/tickets",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "tickets"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"subject\": \"Need help\",\n  \"description\": \"My dashboard is not loading\",\n  \"priority\": \"medium\",\n  \"category\": \"technical\"\n}"
            }
          }
        },
        {
          "name": "Get Ticket",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/tickets/{{ticketId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "tickets",
                "{{ticketId}}"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Student Blogs",
      "item": [
        {
          "name": "List Student Blogs",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/blogs",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "blogs"
              ]
            }
          }
        },
        {
          "name": "Get Student Blog",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/student/blogs/{{blogId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "student",
                "blogs",
                "{{blogId}}"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Student Chat",
      "item": [
        {
          "name": "Eligible Educators",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/Studentchat/educators",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "Studentchat",
                "educators"
              ]
            }
          }
        },
        {
          "name": "Get Chat Messages",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/Studentchat/messages",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "Studentchat",
                "messages"
              ],
              "query": [
                {
                  "key": "educatorId",
                  "value": "{{educatorUserId}}"
                }
              ]
            }
          }
        },
        {
          "name": "Send Chat Message",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/Studentchat/send",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "Studentchat",
                "send"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"educatorId\": \"{{educatorUserId}}\",\n  \"content\": \"Hello, I have a question about my session.\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Legacy Student & Support",
      "item": [
        {
          "name": "Legacy Student Overview",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/dashboard/studentOverview",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "dashboard",
                "studentOverview"
              ]
            }
          }
        },
        {
          "name": "Legacy Update Student Details",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/dashboard/updateStudentDetails",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "dashboard",
                "updateStudentDetails"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Test Student\",\n  \"email\": \"student@yetzu.com\",\n  \"mobileno\": \"+919900000007\"\n}"
            }
          }
        },
        {
          "name": "Legacy Course List",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/course/v1/courselist",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "course",
                "v1",
                "courselist"
              ]
            }
          }
        },
        {
          "name": "Legacy Course Detail",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "{{baseUrl}}/api/course/v1/get/{{courseId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "course",
                "v1",
                "get",
                "{{courseId}}"
              ]
            }
          }
        },
        {
          "name": "Legacy Course Create",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/course/v1/createcourse",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "course",
                "v1",
                "createcourse"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Sample Course\",\n  \"subtitle\": \"Legacy course wrapper\"\n}"
            }
          }
        },
        {
          "name": "Legacy Course Enroll",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/course/v1/enrollcourse",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "course",
                "v1",
                "enrollcourse"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"courseId\": \"{{courseId}}\",\n  \"userId\": \"{{studentUserId}}\"\n}"
            }
          }
        },
        {
          "name": "Legacy Message Send",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/message/send",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "message",
                "send"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"to\": \"{{educatorUserId}}\",\n  \"content\": \"Legacy message send test\"\n}"
            }
          }
        },
        {
          "name": "Legacy Message Get",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "userid",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/message/get/{{educatorUserId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "message",
                "get",
                "{{educatorUserId}}"
              ]
            }
          }
        },
        {
          "name": "Legacy Message Seen",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/message/seen",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "message",
                "seen"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"messageId\": \"{{messageId}}\"\n}"
            }
          }
        },
        {
          "name": "Legacy Message Delete",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/message/delete",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "message",
                "delete"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"messageId\": \"{{messageId}}\"\n}"
            }
          }
        },
        {
          "name": "Legacy Message Delete All",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/message/deleteAll",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "message",
                "deleteAll"
              ]
            }
          }
        },
        {
          "name": "Legacy Message Delete Selected",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/message/deleteSelected",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "message",
                "deleteSelected"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"messageIds\": [\n    \"{{messageId}}\"\n  ]\n}"
            }
          }
        },
        {
          "name": "Assignment Student List Helper",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/assignment/studentList",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "assignment",
                "studentList"
              ]
            }
          }
        },
        {
          "name": "Assignment Educator List Helper",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{educatorToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{educatorUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/assignment/educatorList",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "assignment",
                "educatorList"
              ]
            }
          }
        },
        {
          "name": "Assignment Upload Helper",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{educatorToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{educatorUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/assignment/upload",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "assignment",
                "upload"
              ]
            },
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                }
              ]
            }
          }
        },
        {
          "name": "Assignment Update Status Helper",
          "request": {
            "method": "PATCH",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{educatorToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{educatorUserId}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/assignment/update-status",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "assignment",
                "update-status"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"assignmentId\": \"{{assignmentId}}\",\n  \"status\": \"reviewed\"\n}"
            }
          }
        },
        {
          "name": "Get Meeting Link",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{studentToken}}"
              },
              {
                "key": "x-user-id",
                "value": "{{studentUserId}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/user/getMeetingLink",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "user",
                "getMeetingLink"
              ],
              "query": [
                {
                  "key": "userId",
                  "value": "{{studentUserId}}"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Admin Sessions Metadata",
      "item": [
        {
          "name": "List Sessions",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "admin",
                "sessions"
              ]
            }
          }
        },
        {
          "name": "Create Session With Metadata",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "admin",
                "sessions"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"title\": \"Testing session creation of type course\",\n  \"description\": \"Testing session creation of type course\",\n  \"sessionType\": \"certification\",\n  \"category\": \"mentorship\",\n  \"assignmentEnabled\": true,\n  \"certificateEnabled\": true,\n  \"mode\": \"online\",\n  \"date\": \"2026-06-21\",\n  \"startTime\": \"10:00\",\n  \"endTime\": \"11:30\",\n  \"capacity\": 50,\n  \"maxStudents\": 50,\n  \"minStudents\": 5,\n  \"educatorId\": \"{{educatorUserId}}\",\n  \"pricingType\": \"paid\",\n  \"price\": 4999,\n  \"billingInterval\": \"monthly\",\n  \"bundleSessions\": [],\n  \"assignments\": [],\n  \"metadata\": {\n    \"tooltip\": {\n      \"testType\": \"course\",\n      \"badges\": [\n        \"Bestseller\",\n        \"Updated June 2026\",\n        \"Mentor-Led Sessions\",\n        \"online\",\n        \"All Levels\"\n      ],\n      \"summary\": \"Testing session creation of type course\",\n      \"whatYouWillGet\": [\n        \"1:1 dedicated support from verified expert mentors\",\n        \"Clear step-by-step guidance on assignments and projects\",\n        \"Flexible study-friendly scheduling and interactive sessions\"\n      ]\n    },\n    \"publicDetails\": {\n      \"whatYouWillLearn\": {\n        \"heading\": \"What You Will Learn\",\n        \"nextSteps\": [\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\"\n        ]\n      },\n      \"thingsYouWillGet\": [\n        \"Certificate\",\n        \"PDF Summary\",\n        \"Templates\",\n        \"13 Q&A Session\"\n      ],\n      \"valueYouWillReceive\": \"Lorem ipsum is a good way to start your design Lorem ipsum is a good way to start your design Lorem ipsum is a good way to start your design Lorem ipsum is a good way to start your design\",\n      \"whoIsThisFor\": {\n        \"heading\": \"Who Is This For\",\n        \"description\": \"Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design\",\n        \"bullets\": [\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\"\n        ]\n      }\n    }\n  }\n}"
            }
          }
        },
        {
          "name": "Get Session",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "admin",
                "sessions",
                "{{sessionId}}"
              ]
            }
          }
        },
        {
          "name": "Update Session Metadata",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "admin",
                "sessions",
                "{{sessionId}}"
              ]
            },
            "body": {
              "mode": "raw",
              "raw": "{\n  \"metadata\": {\n    \"tooltip\": {\n      \"testType\": \"course\",\n      \"badges\": [\n        \"Bestseller\",\n        \"Updated June 2026\",\n        \"Mentor-Led Sessions\",\n        \"online\",\n        \"All Levels\"\n      ],\n      \"summary\": \"Testing session creation of type course\",\n      \"whatYouWillGet\": [\n        \"1:1 dedicated support from verified expert mentors\",\n        \"Clear step-by-step guidance on assignments and projects\",\n        \"Flexible study-friendly scheduling and interactive sessions\"\n      ]\n    },\n    \"publicDetails\": {\n      \"whatYouWillLearn\": {\n        \"heading\": \"What You Will Learn\",\n        \"nextSteps\": [\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\"\n        ]\n      },\n      \"thingsYouWillGet\": [\n        \"Certificate\",\n        \"PDF Summary\",\n        \"Templates\",\n        \"13 Q&A Session\"\n      ],\n      \"valueYouWillReceive\": \"Lorem ipsum is a good way to start your design Lorem ipsum is a good way to start your design Lorem ipsum is a good way to start your design Lorem ipsum is a good way to start your design\",\n      \"whoIsThisFor\": {\n        \"heading\": \"Who Is This For\",\n        \"description\": \"Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design Lorem ipsum is a good way to start your design Loren ipsum is a good way for your design\",\n        \"bullets\": [\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\",\n          \"Lorem ipsum\"\n        ]\n      }\n    }\n  }\n}"
            }
          }
        },
        {
          "name": "Delete Session",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer {{adminToken}}"
              }
            ],
            "url": {
              "raw": "{{baseUrl}}/api/admin/sessions/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "admin",
                "sessions",
                "{{sessionId}}"
              ]
            }
          }
        }
      ]
    }
  ],
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "studentToken",
      "value": ""
    },
    {
      "key": "studentUserId",
      "value": ""
    },
    {
      "key": "educatorToken",
      "value": ""
    },
    {
      "key": "educatorUserId",
      "value": ""
    },
    {
      "key": "adminToken",
      "value": ""
    },
    {
      "key": "sessionId",
      "value": ""
    },
    {
      "key": "courseId",
      "value": ""
    },
    {
      "key": "assignmentId",
      "value": ""
    },
    {
      "key": "ticketId",
      "value": ""
    },
    {
      "key": "blogId",
      "value": ""
    },
    {
      "key": "invoiceId",
      "value": ""
    },
    {
      "key": "cmsPageKey",
      "value": "home"
    },
    {
      "key": "cmsSectionKey",
      "value": "hero"
    },
    {
      "key": "messageId",
      "value": ""
    },
    {
      "key": "refreshToken",
      "value": ""
    },
    {
      "key": "resetToken",
      "value": ""
    }
  ]
}
