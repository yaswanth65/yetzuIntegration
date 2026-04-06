import { Home, Monitor, BookOpen, HelpCircle } from 'lucide-react';

export const MENU_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'sessions', label: 'My Sessions', icon: Monitor },
  { id: 'assignments', label: 'Assignments', icon: BookOpen },
];

export const BOTTOM_MENU_ITEMS = [
  { label: 'Help & Support', icon: HelpCircle },
];

export const STATS_DATA = [
  { label: 'Active Students', value: '01' },
  { label: 'Active Sessions', value: '210' },
  { label: 'Assignments Reviewed', value: '11' },
  { label: 'Webinars & Cohorts Attended', value: '129' },
];

export const TRENDING_SKILLS = [
  {
    id: 1,
    title: 'The Trending AI Skills',
    description: 'Drop By If You-Re Around 8 Local Are Already Hanging.',
    participants: 4,
    images: [
      'https://picsum.photos/40/40?random=1',
      'https://picsum.photos/40/40?random=2',
      'https://picsum.photos/40/40?random=3',
      'https://picsum.photos/40/40?random=4',
    ]
  },
  {
    id: 2,
    title: 'The Trending AI Skills',
    description: 'Drop By If You-Re Around 8 Local Are Already Hanging.',
    participants: 4,
    images: [
      'https://picsum.photos/40/40?random=5',
      'https://picsum.photos/40/40?random=6',
      'https://picsum.photos/40/40?random=7',
      'https://picsum.photos/40/40?random=8',
    ]
  },
  {
    id: 3,
    title: 'The Trending AI Skills',
    description: 'Drop By If You-Re Around 8 Local Are Already Hanging.',
    participants: 4,
    images: [
      'https://picsum.photos/40/40?random=9',
      'https://picsum.photos/40/40?random=10',
      'https://picsum.photos/40/40?random=11',
      'https://picsum.photos/40/40?random=12',
    ]
  }
];

export const PENDING_ASSIGNMENTS = [
  {
    id: 'ID',
    name: 'Name of the Webinar or programe',
    type: 'Webinar',
    deadline: '14-01-2026',
  },
  {
    id: 'ID',
    name: 'Name of the Webinar or programe',
    type: 'Webinar',
    deadline: '14-01-2026',
  },
  {
    id: 'ID',
    name: 'Name of the Webinar or programe',
    type: '1:1 Mentorship',
    deadline: '14-01-2026',
  },
  {
    id: 'ID',
    name: 'Name of the Webinar or programe',
    type: 'Cohort',
    deadline: '14-01-2026',
  },
  {
    id: 'ID',
    name: 'Name of the Webinar or programe',
    type: 'Webinar',
    deadline: '14-01-2026',
  },
];

export const FULL_ASSIGNMENTS_LIST = [
    {
        id: '3443345345',
        name: 'Name of the Webinar or programe',
        assignment: 'Importance of Medical Ethics',
        status: 'Posted',
        deadline: '14-01-2026'
    },
    {
        id: 'ID',
        name: 'Name of the Webinar or programe',
        assignment: 'It focuses on patient care and moral re...',
        status: 'Completed',
        deadline: '14-01-2026'
    },
    {
        id: 'ID',
        name: 'Name of the Webinar or programe',
        assignment: "Autonomy respects a patient's right",
        status: 'Attention',
        deadline: '14-01-2026'
    },
    {
        id: 'ID',
        name: 'Name of the Webinar or programe',
        assignment: "Non-maleficence means 'do no harm.'",
        status: 'Attention',
        deadline: '14-01-2026'
    },
    {
        id: 'ID',
        name: 'Name of the Webinar or programe',
        assignment: 'Importance of Medical Ethics',
        status: 'Attention',
        deadline: '14-01-2026'
    },
    {
        id: 'ID',
        name: 'Name of the Webinar or programe',
        assignment: 'It focuses on patient care and moral re...',
        status: 'Attention',
        deadline: '14-01-2026'
    },
    {
        id: 'ID',
        name: 'Name of the Webinar or programe',
        assignment: 'It focuses on patient care and moral re...',
        status: 'Attention',
        deadline: '14-01-2026'
    }
];

export const SUBMISSIONS_LIST = [
    {
        id: 1,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=201',
        type: 'Webinar',
        task: 'Non-maleficence means "do no harm."',
        status: 'Feedback'
    },
    {
        id: 2,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=202',
        type: 'Cohort/1:1 Mentor',
        task: 'It focuses on patient care and moral re...',
        status: 'Upload'
    },
    {
        id: 3,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=203',
        type: 'Webinar',
        task: 'It focuses on patient care and moral re...',
        status: 'Review'
    },
    {
        id: 4,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=204',
        type: 'Webinar',
        task: 'It focuses on patient care and moral re...',
        status: 'Review'
    },
    {
        id: 5,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=205',
        type: 'Webinar',
        task: 'It focuses on patient care and moral re...',
        status: 'Feedback'
    },
    {
        id: 6,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=206',
        type: 'Webinar',
        task: 'It focuses on patient care and moral re...',
        status: 'Review'
    },
    {
        id: 7,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=207',
        type: 'Webinar',
        task: 'It focuses on patient care and moral re...',
        status: 'Feedback'
    },
    {
        id: 8,
        studentName: 'Amit Bhat',
        designation: 'Designation',
        avatar: 'https://picsum.photos/40/40?random=208',
        type: 'Webinar',
        task: 'It focuses on patient care and moral re...',
        status: 'Review'
    }
];

export const SCHEDULE_DAYS = [
  { day: 'Mon', date: '12', active: false },
  { day: 'Tue', date: '13', active: true },
  { day: 'Wed', date: '14', active: false },
  { day: 'Thu', date: '15', active: false },
  { day: 'Fri', date: '16', active: false },
  { day: 'Sat', date: '17', active: false },
  { day: 'Sun', date: '18', active: false },
];

export const SLOTS = [
  { name: 'Session name', type: 'Webinar', time: '10 AM - 11 AM' },
  { name: 'Session name', type: 'Webinar', time: '10 AM - 11 AM' },
  { name: 'Session name', type: 'Webinar', time: '10 AM - 11 AM' },
  { name: 'Session name', type: 'Webinar', time: '10 AM - 11 AM' },
];

export const CHAT_LIST = [
  { id: 1, name: 'Amit Bhat', message: 'Sir we can arrange a call at 12...', time: '12:45PM', avatar: 'https://picsum.photos/40/40?random=100' },
  { id: 2, name: 'Amit Bhat', message: 'Sir we can arrange a call at 12...', time: '12:45PM', avatar: 'https://picsum.photos/40/40?random=101' },
  { id: 3, name: 'Amit Bhat', message: 'Sir we can arrange a call at 12...', time: '12:45PM', avatar: 'https://picsum.photos/40/40?random=102' },
  { id: 4, name: 'Amit Bhat', message: 'Sir we can arrange a call at 12...', time: '12:45PM', avatar: 'https://picsum.photos/40/40?random=103' },
  { id: 5, name: 'Amit Bhat', message: 'Sir we can arrange a call at 12...', time: '12:45PM', avatar: 'https://picsum.photos/40/40?random=104' },
  { id: 6, name: 'Amit Bhat', message: 'Sir we can arrange a call at 12...', time: '12:45PM', avatar: 'https://picsum.photos/40/40?random=105' },
];

export const MOCK_MESSAGES = [
  { id: 1, text: "Lorem Ipsum is free text to use when evey you want", sender: 'them', avatar: 'https://picsum.photos/40/40?random=100' },
  { id: 2, text: "Lorem Ipsum is free", sender: 'me', avatar: 'https://picsum.photos/40/40?random=99' },
  { id: 3, text: "...", sender: 'them', avatar: 'https://picsum.photos/40/40?random=100', isTyping: true },
];

export const NOTIFICATIONS = [
  { id: 1, title: 'New Assignment', message: 'A new assignment has been submitted.', time: '2m ago' },
  { id: 2, title: 'Session Reminder', message: 'Your session starts in 15 minutes.', time: '15m ago' },
  { id: 3, title: 'System', message: 'Welcome to the new dashboard!', time: '1d ago' },
];

export const CALENDAR_SESSIONS = [
    {
        id: 1,
        title: 'How is AR used in medical procedure',
        dayIndex: 1,
        startHour: 9,
        duration: 1,
        color: 'blue',
        timeString: '09 AM - 10 AM',
        participants: 4
    },
    {
        id: 2,
        title: 'How is AR used in medical procedure',
        dayIndex: 1,
        startHour: 12,
        duration: 1,
        color: 'blue',
        timeString: '09 AM - 10 AM',
        participants: 4
    },
    {
        id: 3,
        title: 'How is AR used in medical procedure',
        dayIndex: 2,
        startHour: 11,
        duration: 1,
        color: 'green',
        timeString: '09 AM - 10 AM',
        participants: 0
    },
    {
        id: 4,
        title: 'How is AR used in medical procedure',
        dayIndex: 3,
        startHour: 10,
        duration: 2,
        color: 'purple',
        timeString: '01 PM - 03 PM',
        participants: 4
    },
    {
        id: 5,
        title: 'How is AR used in medical procedure',
        dayIndex: 0,
        startHour: 13,
        duration: 2,
        color: 'purple',
        timeString: '01 PM - 03 PM',
        participants: 4
    }
];

export const WEBINARS_LIST = [
  { id: 1, name: 'The Trending AI Skills', type: 'Webinar' },
  { id: 2, name: 'Advanced Machine Learning', type: 'Webinar' },
  { id: 3, name: 'Python for Data Science', type: 'Webinar' },
  { id: 4, name: 'Web Development Bootcamp', type: 'Cohort' },
  { id: 5, name: '1:1 Mentorship Program', type: '1:1 Mentorship' },
  { id: 6, name: 'Cloud Computing Essentials', type: 'Webinar' },
  { id: 7, name: 'iOS Development Course', type: 'Cohort' },
];
