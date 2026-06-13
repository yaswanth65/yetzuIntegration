{
  "info": {
    "_postman_id": "6f5b20c8-7d5e-4b6b-8b37-educator-api-000001",
    "name": "YETZU Educator API",
    "description": "Educator API collection covering dashboard, sessions, session files, assignments, submissions, tickets, and reschedule flows.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "auth": {
    "type": "bearer",
    "bearer": [
      {
        "key": "token",
        "value": "{{educatorToken}}",
        "type": "string"
      }
    ]
  },
  "variable": [
    {
      "key": "baseUrl",
      "value": "http://localhost:3000"
    },
    {
      "key": "educatorToken",
      "value": "<EDUCATOR_JWT>"
    },
    {
      "key": "educatorUserId",
      "value": "<EDUCATOR_UUID>"
    },
    {
      "key": "sessionId",
      "value": "<SESSION_UUID>"
    },
    {
      "key": "assignmentId",
      "value": "<ASSIGNMENT_UUID>"
    },
    {
      "key": "submissionId",
      "value": "<SUBMISSION_UUID>"
    },
    {
      "key": "ticketId",
      "value": "<TICKET_UUID>"
    },
    {
      "key": "requestId",
      "value": "<REQUEST_UUID>"
    },
    {
      "key": "courseId",
      "value": "<COURSE_UUID>"
    },
    {
      "key": "studentId",
      "value": "<STUDENT_UUID>"
    },
    {
      "key": "resourceId",
      "value": "<RESOURCE_UUID>"
    }
  ],
  "item": [
    {
      "name": "Dashboard",
      "item": [
        {
          "name": "Educator Overview",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/overview",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "overview"
              ]
            }
          }
        },
        {
          "name": "My Session Summary",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/my-session",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "my-session"
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
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/dashboard/notifications",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "dashboard",
                "notifications"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Sessions",
      "item": [
        {
          "name": "List Sessions",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/sessions?page=1&limit=10&status=all",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions"
              ],
              "query": [
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                },
                {
                  "key": "status",
                  "value": "all"
                }
              ]
            }
          }
        },
        {
          "name": "Get Session Detail",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/sessions/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions",
                "{{sessionId}}"
              ]
            }
          }
        },
        {
          "name": "Update Session",
          "request": {
            "method": "PUT",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"notes\": \"Updated note\",\n  \"status\": \"upcoming\",\n  \"sessionLink\": \"https://meet.google.com/example\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/sessions/{{sessionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions",
                "{{sessionId}}"
              ]
            }
          }
        },
        {
          "name": "Session Files List",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/sessions/{{sessionId}}/files",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions",
                "{{sessionId}}",
                "files"
              ]
            }
          }
        },
        {
          "name": "Upload Session Resource",
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
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                },
                {
                  "key": "title",
                  "value": "Pre-session Reading"
                },
                {
                  "key": "description",
                  "value": "Uploaded resource for students"
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/sessions/{{sessionId}}/files",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions",
                "{{sessionId}}",
                "files"
              ]
            }
          }
        },
        {
          "name": "Update Session Resource",
          "request": {
            "method": "PUT",
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
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "resourceId",
                  "value": "{{resourceId}}"
                },
                {
                  "key": "title",
                  "value": "Updated Resource Title"
                },
                {
                  "key": "description",
                  "value": "Updated resource description"
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/sessions/{{sessionId}}/files",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions",
                "{{sessionId}}",
                "files"
              ]
            }
          }
        },
        {
          "name": "Delete Session Resource",
          "request": {
            "method": "DELETE",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/sessions/{{sessionId}}/files?resourceId={{resourceId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "sessions",
                "{{sessionId}}",
                "files"
              ],
              "query": [
                {
                  "key": "resourceId",
                  "value": "{{resourceId}}"
                }
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Assignment Helpers",
      "item": [
        {
          "name": "Assignment Session Options",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/assignments/session-options?search=&status=all&onlyAssignable=true&includeAll=false",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "session-options"
              ],
              "query": [
                {
                  "key": "search",
                  "value": ""
                },
                {
                  "key": "status",
                  "value": "all"
                },
                {
                  "key": "onlyAssignable",
                  "value": "true"
                },
                {
                  "key": "includeAll",
                  "value": "false"
                }
              ]
            }
          }
        },
        {
          "name": "Assignment List View",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/assignments/list?status=&search=",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "list"
              ],
              "query": [
                {
                  "key": "status",
                  "value": ""
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
          "name": "Create Assignment",
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
            "body": {
              "mode": "formdata",
              "formdata": [
                {
                  "key": "title",
                  "value": "Essay Draft"
                },
                {
                  "key": "description",
                  "value": "Submit your first draft"
                },
                {
                  "key": "dueDate",
                  "value": "2026-06-15T18:00:00.000Z"
                },
                {
                  "key": "sessionId",
                  "value": "{{sessionId}}"
                },
                {
                  "key": "assignedStudents",
                  "value": "[\"{{studentId}}\"]"
                },
                {
                  "key": "file",
                  "type": "file",
                  "src": ""
                }
              ]
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/assignments/create",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "create"
              ]
            }
          }
        },
        {
          "name": "Get Assignments",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/assignments?search=&status=&courseId=&sessionId=",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments"
              ],
              "query": [
                {
                  "key": "search",
                  "value": ""
                },
                {
                  "key": "status",
                  "value": ""
                },
                {
                  "key": "courseId",
                  "value": ""
                },
                {
                  "key": "sessionId",
                  "value": ""
                }
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
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/assignments/{{assignmentId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "{{assignmentId}}"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Submissions",
      "item": [
        {
          "name": "Get Submissions",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/assignments/submissions?page=1&limit=10&status=all&assignmentId=&sessionId=&studentId=&search=",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "submissions"
              ],
              "query": [
                {
                  "key": "page",
                  "value": "1"
                },
                {
                  "key": "limit",
                  "value": "10"
                },
                {
                  "key": "status",
                  "value": "all"
                },
                {
                  "key": "assignmentId",
                  "value": ""
                },
                {
                  "key": "sessionId",
                  "value": ""
                },
                {
                  "key": "studentId",
                  "value": ""
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
          "name": "Get Submission Detail",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
              "raw": "{{baseUrl}}/api/educator/assignments/submissions/{{submissionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "submissions",
                "{{submissionId}}"
              ]
            }
          }
        },
        {
          "name": "Update Submission Feedback",
          "request": {
            "method": "PATCH",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"status\": \"reviewed\",\n  \"educatorRemark\": \"Good work\",\n  \"feedbackUrl\": \"https://example.com/review.pdf\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/assignments/submissions/{{submissionId}}",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "submissions",
                "{{submissionId}}"
              ]
            }
          }
        },
        {
          "name": "Add Assignment Feedback",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"assignmentId\": \"{{assignmentId}}\",\n  \"text\": \"Please add more references and resubmit.\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/assignments/feedback",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "assignments",
                "feedback"
              ]
            }
          }
        },
        {
          "name": "Review Submission",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"submissionId\": \"{{submissionId}}\",\n  \"status\": \"reviewed\",\n  \"educatorRemark\": \"Reviewed and approved with minor comments.\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/submissions/review",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "submissions",
                "review"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Tickets",
      "item": [
        {
          "name": "Create Ticket",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"subject\": \"Need help with session resource upload\",\n  \"description\": \"The resource upload is failing for one file.\",\n  \"priority\": \"medium\",\n  \"category\": \"technical\",\n  \"sessionId\": \"{{sessionId}}\",\n  \"assignmentId\": \"{{assignmentId}}\",\n  \"studentId\": \"{{studentId}}\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/tickets",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "tickets"
              ]
            }
          }
        }
      ]
    },
    {
      "name": "Reschedule",
      "item": [
        {
          "name": "Request Reschedule",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"sessionId\": \"{{sessionId}}\",\n  \"proposedDate\": \"2026-06-12\",\n  \"proposedTime\": \"10:30\",\n  \"reason\": \"Need to move the class due to a schedule conflict.\",\n  \"studentId\": \"{{studentId}}\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/session/reschedule-request",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "session",
                "reschedule-request"
              ]
            }
          }
        },
        {
          "name": "Review Reschedule Action",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Accept",
                "value": "application/json"
              },
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
            "body": {
              "mode": "raw",
              "raw": "{\n  \"sessionId\": \"{{sessionId}}\",\n  \"requestId\": \"{{requestId}}\",\n  \"action\": \"approved\",\n  \"educatorRemark\": \"Approved.\"\n}"
            },
            "url": {
              "raw": "{{baseUrl}}/api/educator/reschedule-action",
              "host": [
                "{{baseUrl}}"
              ],
              "path": [
                "api",
                "educator",
                "reschedule-action"
              ]
            }
          }
        }
      ]
    }
  ]
}
