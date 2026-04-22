import { Contact, Message } from './types';

export const MOCK_STUDENTS: Contact[] = [
  {
    id: "1",
    name: "Avanya",
    studentId: "#STU-2736472",
    avatar: "https://i.pravatar.cc/150?img=47",
    lastMessage: "We can reschedule to anytime that works f...",
    time: "3m",
    unread: false,
    sessionName: "Webinar: Breakthroughs in Cognitive NeuroscienceSemi..."
  },
  {
    id: "2",
    name: "Ansh Mehta",
    studentId: "#STU-4567300",
    avatar: "https://i.pravatar.cc/150?img=11",
    lastMessage: "Start a conversation with Ansh Mehta",
    time: "",
    unread: false,
    sessionName: "Webinar: Breakthroughs in Cognitive NeuroscienceSemi..."
  },
  {
    id: "3",
    name: "Krishna Priya",
    studentId: "#STU-998877",
    avatar: "https://i.pravatar.cc/150?img=5",
    lastMessage: "You: Can we plan this once I'm done with t...",
    time: "41m",
    unread: false,
    sessionName: "Mentorship: Career Guidance"
  },
  {
    id: "4",
    name: "Ujwala",
    studentId: "#STU-112233",
    avatar: "https://i.pravatar.cc/150?img=44",
    lastMessage: "This is regarding the session we have plan...",
    time: "2h",
    unread: true,
    sessionName: ""
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  "1": [
    { id: "m1", sender: "them", content: "Hi Natalia" },
    { id: "m2", sender: "them", content: "I was thinking of rescheduling our session to anytime on monday..." },
    { id: "m3", sender: "them", content: "Can you please share your availability?", showAvatar: true },
    { id: "m4", sender: "me", content: "We can reschedule to any time that works for you, I'm available all day on monday.", time: "12:00 PM" }
  ],
  "2": [],
  "3": [
     { id: "m5", sender: "me", content: "Can we plan this once I'm done with the exams?", time: "10:00 AM" }
  ],
  "4": [
     { id: "m6", sender: "them", content: "This is regarding the session we have planned for tomorrow.", time: "09:00 AM", showAvatar: true }
  ]
};
