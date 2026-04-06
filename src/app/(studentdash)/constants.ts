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
  { label: 'Sessions Attended', value: '129' },
];
 

export const ASSIGNMENTS_DATA = [
  {
    id: "400301",
    slug: "gametogenesis-overview",
    title: "Gametogenesis Overview",
    date: "15-01-2026",
    subtitle: "Male & Female Gametes",
    mentor: { name: "Dr. Meenakshi", avatar: "/images/placeholder-avatar.png", date: "16 Jan 2026" },
    webinar: {
      heroImage: "/images/embryology-hero.jpg",
      date: "22-01-26",
      time: "10:00 AM - 11:30 AM",
      description: "Spermatogenesis and oogenesis basics.",
      timeline: [
        { title: "Intro", time: "10:00–10:10", desc: "Overview." },
        { title: "Spermatogenesis", time: "10:10–10:35", desc: "Male process." },
        { title: "Oogenesis", time: "10:35–11:00", desc: "Female process." },
        { title: "Hormones", time: "11:00–11:15", desc: "FSH, LH." },
        { title: "Clinical", time: "11:15–11:30", desc: "Infertility." }
      ]
    },
    assignments: [
      { id: "AS401", title: "Stages List", uploadOn: "14-01-2026", dueDate: "05 Feb 26", description: "List stages.", studyMaterials: [{ name: "Notes.pdf", size: "3.1 MB" }] },
      { id: "AS402", title: "Diagram Task", uploadOn: "15-01-2026", dueDate: "06 Feb 26", description: "Draw diagrams.", studyMaterials: [{ name: "Diagrams.pdf", size: "1.4 MB" }] },
      { id: "AS403", title: "MCQ Set", uploadOn: "16-01-2026", dueDate: "07 Feb 26", description: "Practice MCQs.", studyMaterials: [{ name: "MCQs.pdf", size: "900 KB" }] }
    ]
  },
  {
    id: "400302",
    slug: "fertilization-implantation",
    title: "Fertilization & Implantation",
    date: "18-01-2026",
    subtitle: "Early Development",
    mentor: { name: "Dr. Karthik", avatar: "/images/placeholder-avatar.png", date: "18 Jan 2026" },
    webinar: {
      heroImage: "/images/fertilization-hero.jpg",
      date: "24-01-26",
      time: "11:30 AM - 1:00 PM",
      description: "Fertilization to implantation.",
      timeline: [
        { title: "Fertilization", time: "11:30–11:50", desc: "Zygote." },
        { title: "Cleavage", time: "11:50–12:10", desc: "Morula." },
        { title: "Blastocyst", time: "12:10–12:30", desc: "Formation." },
        { title: "Implantation", time: "12:30–12:50", desc: "Uterus." },
        { title: "Ectopic", time: "12:50–1:00", desc: "Abnormal." }
      ]
    },
    assignments: [
      { id: "AS404", title: "Flow Chart", uploadOn: "18-01-2026", dueDate: "08 Feb 26", description: "Stages flow.", studyMaterials: [{ name: "Flow.pdf", size: "1.2 MB" }] },
      { id: "AS405", title: "Ectopic Causes", uploadOn: "19-01-2026", dueDate: "09 Feb 26", description: "List causes.", studyMaterials: [{ name: "Cases.pdf", size: "1.9 MB" }] }
    ]
  },
  {
    id: "400303",
    slug: "placenta-development",
    title: "Placental Development",
    date: "20-01-2026",
    subtitle: "Structure & Function",
    mentor: { name: "Dr. Pavithra", avatar: "/images/placeholder-avatar.png", date: "20 Jan 2026" },
    webinar: {
      heroImage: "/images/placenta-hero.jpg",
      date: "27-01-26",
      time: "9:30 AM - 11:00 AM",
      description: "Placenta formation and roles.",
      timeline: [
        { title: "Villi", time: "9:30–9:50", desc: "Formation." },
        { title: "Circulation", time: "9:50–10:15", desc: "Blood flow." },
        { title: "Barrier", time: "10:15–10:35", desc: "Exchange." },
        { title: "Functions", time: "10:35–10:50", desc: "Hormones." },
        { title: "Abnormal", time: "10:50–11:00", desc: "Previa." }
      ]
    },
    assignments: [
      { id: "AS406", title: "Placental Barrier", uploadOn: "20-01-2026", dueDate: "12 Feb 26", description: "Explain barrier.", studyMaterials: [{ name: "Barrier.pdf", size: "2.3 MB" }] },
      { id: "AS407", title: "Abnormalities", uploadOn: "21-01-2026", dueDate: "13 Feb 26", description: "List types.", studyMaterials: [{ name: "Abnormal.pdf", size: "1.5 MB" }] }
    ]
  },
  {
    id: "400304",
    slug: "neurulation-ntd",
    title: "Neurulation & NTD",
    date: "24-01-2026",
    subtitle: "CNS Development",
    mentor: { name: "Dr. Lakshmi", avatar: "/images/placeholder-avatar.png", date: "24 Jan 2026" },
    webinar: {
      heroImage: "/images/neurulation-hero.jpg",
      date: "31-01-26",
      time: "11:00 AM - 12:30 PM",
      description: "Neural tube formation.",
      timeline: [
        { title: "Neural Plate", time: "11:00–11:20", desc: "Formation." },
        { title: "Neural Tube", time: "11:20–11:45", desc: "Closure." },
        { title: "Primary", time: "11:45–12:00", desc: "Neurulation." },
        { title: "Secondary", time: "12:00–12:15", desc: "Caudal." },
        { title: "NTD", time: "12:15–12:30", desc: "Defects." }
      ]
    },
    assignments: [
      { id: "AS408", title: "NTD Types", uploadOn: "24-01-2026", dueDate: "18 Feb 26", description: "Classify.", studyMaterials: [{ name: "NTD.pdf", size: "3.5 MB" }] },
      { id: "AS409", title: "Folic Acid", uploadOn: "25-01-2026", dueDate: "19 Feb 26", description: "Role.", studyMaterials: [{ name: "Prevention.pdf", size: "800 KB" }] }
    ]
  },
  {
    id: "400305",
    slug: "cardiac-development",
    title: "Cardiac Development",
    date: "26-01-2026",
    subtitle: "Heart Formation",
    mentor: { name: "Dr. Mahesh", avatar: "/images/placeholder-avatar.png", date: "26 Jan 2026" },
    webinar: {
      heroImage: "/images/cardiac-development-hero.jpg",
      date: "02-02-26",
      time: "9:30 AM - 11:00 AM",
      description: "Heart tube to septation.",
      timeline: [
        { title: "Heart Tube", time: "9:30–9:50", desc: "Primitive." },
        { title: "Looping", time: "9:50–10:15", desc: "Cardiac." },
        { title: "Atrial Septum", time: "10:15–10:30", desc: "ASD." },
        { title: "Ventricular", time: "10:30–10:45", desc: "VSD." },
        { title: "CHD", time: "10:45–11:00", desc: "Common." }
      ]
    },
    assignments: [
      { id: "AS410", title: "Septation Notes", uploadOn: "26-01-2026", dueDate: "22 Feb 26", description: "Explain.", studyMaterials: [{ name: "Septation.pdf", size: "4.0 MB" }] },
      { id: "AS411", title: "CHD List", uploadOn: "27-01-2026", dueDate: "23 Feb 26", description: "List defects.", studyMaterials: [{ name: "CHD.pdf", size: "2.1 MB" }] }
    ]
  }
];



export const TRENDING_SKILLS =  ASSIGNMENTS_DATA.map((item, index) => ({
  id: item.id,
  slug: item.slug,                // 🔑 used for navigation
  title: item.title,
  subtitle: item.subtitle,
  description: item.webinar.description,
  mentor: item.mentor.name,
  date: item.webinar.date,
  startTime: item.webinar.time.split(" - ")[0],
  endTime: item.webinar.time.split(" - ")[1],
  participants: 4,                // static / dynamic later
  images: [
    `https://picsum.photos/40/40?random=1`,
    `https://picsum.photos/40/40?random=2`,
    `https://picsum.photos/40/40?random=3`,
    `https://picsum.photos/40/40?random=4`,
  ],
}));

export const PENDING_ASSIGNMENTS = [
  {
    id: '123456',
    title: 'Introduction to Generative AI',
    uploadOn: '10-01-2026',
    type: 'Webinar',
    deadline: '14-01-2026',
  },
  {
    id: '123457',
    title: 'React State Management Patterns',
    uploadOn: '11-01-2026',
    type: 'Webinar',
    deadline: '14-01-2026',
  },
  {
    id: '123458',
    title: 'Q4 Career Roadmap Review',
    uploadOn: '12-01-2026',
    type: '1:1 Mentorship',
    deadline: '14-01-2026',
  },
  {
    id: '123459',
    title: 'Full Stack Capstone Proposal',
    uploadOn: '09-01-2026',
    type: 'Cohort',
    deadline: '14-01-2026',
  },
  {
    id: '123460',
    title: 'Understanding Vector Embeddings',
    uploadOn: '13-01-2026',
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

// Assignments data for students dashboard
