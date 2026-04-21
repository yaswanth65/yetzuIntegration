export interface Contact {
  id: string;
  name: string;
  studentId: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  sessionName: string;
}

export interface Message {
  id: string;
  sender: 'me' | 'them';
  content: string;
  time?: string;
  showAvatar?: boolean;
}
