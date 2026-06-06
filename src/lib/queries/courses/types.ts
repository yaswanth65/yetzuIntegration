export interface Course {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  benefits: string[];
  syllabus: { _id: string, title: string, desc: string }[];
  duration: string;
  cost: number;
  pricingType: string;
  finalPrice: number;
  outcomes: string[];
  certificate: string;
  educator: string;
  educatorId: string;
  enrolledStudentIds: string[];
  enrolledCount: number;
  startDateTime: string;
  sessionType: string;
  category: string;
  mode: string;
  scheduleDate: string;
  startTime: string;
  endTime: string;
  capacity: number;
  sessionLink: string;
  status: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CoursesResponse {
  courses: Course[];
}
