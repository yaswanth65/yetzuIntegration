    "use client";

    import React, { useState } from "react";
    import { Link2, Send, MessageSquare, MessageSquareMore } from "lucide-react";

    // Dummy Data
    const CONTACTS = [
    {
        id: "1",
        name: "Dr. Sophia Tyler",
        avatar: "https://ui-avatars.com/api/?name=Sophia+Tyler&background=random",
        preview: "We can reschedule to anytime that works f...",
        time: "2m",
        unread: false,
        title: "Associate Professor, XYZ Institute",
        webinar: "Breakthroughs in Cognitive Neurosciencebinar:"
    },
    {
        id: "2",
        name: "Dr. Michael Chen",
        avatar: "https://ui-avatars.com/api/?name=Michael+Chen&background=random",
        preview: "Start a conversation with Dr. Michael Chen",
        time: "",
        unread: false,
        title: "Associate Professor, XYZ Institute",
        webinar: "Breakthroughs in Cognitive Neurosciencebinar:"
    },
    {
        id: "3",
        name: "Dr. Marygold Nuer",
        avatar: "https://ui-avatars.com/api/?name=Marygold+Nuer&background=random",
        preview: "You: Can we plan this once I'm done with t...",
        time: "41m",
        unread: false,
        title: "Associate Professor, XYZ Institute",
        webinar: "Breakthroughs in Cognitive Neurosciencebinar:"
    },
    {
        id: "4",
        name: "Dr. Emily Nguyen",
        avatar: "https://ui-avatars.com/api/?name=Emily+Nguyen&background=random",
        preview: "This is regarding the session we have plan...",
        time: "2h",
        unread: true,
        title: "Associate Professor, XYZ Institute",
        webinar: "Breakthroughs in Cognitive Neurosciencebinar:"
    },
    ];

    const MESSAGES = [
    {
        id: "m1",
        sender: "them",
        text: "Hi Natalia",
        time: "11:43 AM",
        showAvatar: false,
    },
    {
        id: "m2",
        sender: "them",
        text: "I was thinking of rescheduling our session to anytime on monday...",
        time: "",
        showAvatar: false,
    },
    {
        id: "m3",
        sender: "them",
        text: "Can you please share your availability?",
        time: "",
        showAvatar: true,
    },
    {
        id: "m4",
        sender: "me",
        text: "We can reschedule to any time that works for you, I'm available all day on monday.",
        time: "12:03 PM",
        showAvatar: false,
    },
    ];

    export default function ChatPage() {
    const [activeContactId, setActiveContactId] = useState("1");
    const [inputText, setInputText] = useState("");

    const activeContact = CONTACTS.find((c) => c.id === activeContactId);
    const isTyping = inputText.trim().length > 0;
    const isEmptyChat = activeContactId === "2"; // Simulate empty chat for Dr. Michael Chen

    return (
        <div className="flex flex-col h-screen bg-white font-sans max-w-[1600px] mx-auto">
        {/* Page Header */}
        {/* <div className="px-8 py-3 border-b border-gray-100 shrink-0">
            <h1 className="text-xl font-bold text-gray-900 mb-1">Chat</h1>
            <p className="text-sm text-gray-500">Engage directly with your 1:1 mentors.</p>
        </div> */}

        {/* Main Chat Container */}
        <div className="flex flex-1 overflow-hidden">
            
            {/* Left Sidebar - Contacts List */}
            <div className="w-[350px] border-r border-gray-100 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
            {CONTACTS.map((contact) => (
                <div
                key={contact.id}
                onClick={() => setActiveContactId(contact.id)}
                className={`flex items-start gap-3 p-4 cursor-pointer transition-colors border-l-4 ${
                    activeContactId === contact.id
                    ? "bg-gray-50 border-transparent"
                    : "border-transparent hover:bg-gray-50/50"
                }`}
                >
                {/* Unread Indicator */}
                <div className="w-2 h-2 mt-4 shrink-0 flex items-center justify-center">
                    {contact.unread && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
                </div>

                {/* Avatar */}
                <img
                    src={contact.avatar}
                    alt={contact.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                />

                {/* Contact Info */}
                <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex justify-between items-center mb-1">
                    <h3 className="text-[15px] font-semibold text-gray-900 truncate">
                        {contact.name}
                    </h3>
                    {contact.time && (
                        <span className={`text-xs ${contact.unread ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                        {contact.time}
                        </span>
                    )}
                    </div>
                    <p className="text-[13px] text-gray-500 truncate">
                    {contact.preview}
                    </p>
                </div>
                </div>
            ))}
            </div>

            {/* Right Area - Chat Window */}
            <div className="flex-1 flex flex-col min-w-0 bg-white">
            
            {/* Chat Header */}
            {activeContact && (
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                    <img
                    src={activeContact.avatar}
                    alt={activeContact.name}
                    className="w-11 h-11 rounded-full object-cover shrink-0"
                    />
                    <div>
                    <h2 className="text-[16px] font-bold text-gray-900">{activeContact.name}</h2>
                    {activeContact.title && (
                        <p className="text-[13px] text-gray-500">{activeContact.title}</p>
                    )}
                    </div>
                </div>

                {/* Webinar Pill */}
                {activeContact.webinar && (
                    <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-2 border border-gray-100 max-w-sm">
                    <Link2 size={14} className="text-gray-400 shrink-0" />
                    <p className="text-xs text-gray-600 truncate">
                        <span className="text-gray-500">Webinar: </span>
                        {activeContact.webinar}
                    </p>
                    </div>
                )}
                </div>
            )}

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col">
                
                {isEmptyChat ? (
                // Empty State
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-[#EBF0FF] rounded-2xl flex items-center justify-center mb-4">
                    <MessageSquareMore color="#042BFD" />
                    </div>
                    <p className="text-[15px] text-gray-500">
                    Start a conversation with {activeContact?.name}
                    </p>
                </div>
                ) : (
                // Active Chat State
                <div className="flex flex-col max-w-3xl mx-auto w-full">
                    <div className="text-center mb-6">
                    <span className="text-xs font-medium text-gray-500">Today</span>
                    </div>

                    {/* Simulated Message History */}
                    <div className="flex flex-col gap-2">
                    <div className="text-xs text-gray-400 ml-12 mb-1">11:43 AM</div>
                    
                    {MESSAGES.map((msg) => (
                        <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${
                            msg.sender === "me" ? "justify-end mt-4" : "justify-start"
                        }`}
                        >
                        {/* Avatar Placeholder for alignment or actual Avatar */}
                        {msg.sender === "them" && (
                            <div className="w-8 h-8 shrink-0">
                            {msg.showAvatar && (
                                <img
                                src={activeContact?.avatar}
                                alt="Avatar"
                                className="w-8 h-8 rounded-full object-cover"
                                />
                            )}
                            </div>
                        )}

                        <div className="flex flex-col gap-1 max-w-[70%]">
                            {msg.sender === "me" && msg.time && (
                            <div className="text-xs text-gray-400 text-right mb-1">{msg.time}</div>
                            )}
                            <div
                            className={`px-4 py-2.5 rounded-[20px] text-[15px] ${
                                msg.sender === "me"
                                ? "bg-[#EAEBFC] text-[#111827] rounded-br-sm"
                                : "bg-[#F3F4F6] text-[#111827] rounded-bl-sm"
                            }`}
                            >
                            {msg.text}
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
                )}
            </div>

            {/* Chat Input Area */}
            <div className="p-6 pt-2 shrink-0">
                <div className="relative flex items-center max-w-4xl mx-auto">
                <input
                    type="text"
                    placeholder="Type a message"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full pl-6 pr-14 py-4 bg-white border border-gray-200 rounded-full text-[15px] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300 transition-all"
                />
                {/* Send Button (Only visible when typing) */}
                {isTyping && (
                    <button className="absolute right-2.5 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors flex items-center justify-center">
                    <Send size={16} className="ml-0.5" />
                    </button>
                )}
                </div>
            </div>

            </div>
        </div>
        </div>
    );
    }