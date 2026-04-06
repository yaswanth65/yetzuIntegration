import React, { useState } from 'react';

interface Slot {
  id: number;
  start: string;
  end: string;
  duration: string;
}

interface SlotSchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Icons as SVG components
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-900">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EmptyStateIcon = () => (
  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <rect x="8" y="14" width="2" height="2" fill="#1d4ed8"/>
      <rect x="14" y="14" width="2" height="2" fill="#1d4ed8"/>
      <rect x="8" y="18" width="2" height="2" fill="#1d4ed8"/>
      <rect x="14" y="18" width="2" height="2" fill="#1d4ed8"/>
    </svg>
  </div>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const PlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const SlotSchedulerModal: React.FC<SlotSchedulerModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [slots, setSlots] = useState<Slot[]>([]); 
  const [selectedDate, setSelectedDate] = useState<number>(13);
  
  // Create Slot Form State
  const [startHour, setStartHour] = useState<string>('');
  const [startMin, setStartMin] = useState<string>('00');
  const [startMeridiem, setStartMeridiem] = useState<'AM' | 'PM'>('AM');
  const [endHour, setEndHour] = useState<string>('');
  const [endMin, setEndMin] = useState<string>('00');
  const [endMeridiem, setEndMeridiem] = useState<'AM' | 'PM'>('AM');

  const calendarDays = [
    { day: 'Mon', date: 12 },
    { day: 'Tue', date: 13 },
    { day: 'Wed', date: 14 },
    { day: 'Thu', date: 15 },
    { day: 'Fri', date: 16 },
    { day: 'Sat', date: 17 },
    { day: 'Sun', date: 18 },
  ];

  const handleSaveSlot = () => {
    if (!startHour || !endHour) return;
    
    const newSlot: Slot = {
      id: Date.now(),
      start: `${startHour}:${startMin} ${startMeridiem}`,
      end: `${endHour}:${endMin} ${endMeridiem}`,
      duration: '30 mins'
    };
    
    setSlots([...slots, newSlot]);
    setView('list');
    
    setStartHour('');
    setEndHour('');
  };

  const handleDeleteSlot = (id: number) => {
    setSlots(slots.filter(s => s.id !== id));
  };

  const handleCancelCreate = () => {
    setView('list');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} // Close when clicking outside
    >
      <div 
        className="bg-white rounded-2xl w-[400px] min-h-[400px] shadow-xl overflow-hidden flex flex-col font-sans relative"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        
        {/* Top Right Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <CloseIcon />
        </button>

        {/* Header Section */}
        <div className="p-5 pb-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <CalendarIcon />
              <span>Slots</span>
            </div>
            {view === 'list' && slots.length > 0 && (
              <button 
                onClick={() => setView('create')}
                className="text-gray-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1"
              >
                <PlusIcon /> Add more slot
              </button>
            )}
          </div>

          {/* Date Selector */}
          <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-4">
            {calendarDays.map((item) => (
              <button
                key={item.date}
                onClick={() => setSelectedDate(item.date)}
                className={`flex flex-col items-center justify-center w-10 h-14 rounded-lg transition-colors ${
                  selectedDate === item.date
                    ? 'bg-black text-white'
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="text-xs font-medium mb-1">{item.day}</span>
                <span className="text-sm font-bold">{item.date}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-5 pt-0">
          
          {/* VIEW 1: No Slots */}
          {view === 'list' && slots.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <EmptyStateIcon />
              <h3 className="text-lg font-semibold text-gray-900 mb-1">No Slots For Today?</h3>
              <p className="text-gray-500 text-sm mb-6">Please create slots for Class Schedule</p>
              <button
                onClick={() => setView('create')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg transition-colors"
              >
                Create Slot
              </button>
            </div>
          )}

          {/* VIEW 2: Create Slot Form */}
          {view === 'create' && (
            <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-200">
              <div className="flex gap-6 mb-2">
                {/* Start Time */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-2">Start Time</label>
                  <div className="flex items-center gap-1 mb-2">
                     <div className="flex bg-gray-100 rounded p-0.5">
                        <button 
                          onClick={() => setStartMeridiem('AM')}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${startMeridiem === 'AM' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                        >AM</button>
                        <button 
                          onClick={() => setStartMeridiem('PM')}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${startMeridiem === 'PM' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                        >PM</button>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={startHour}
                      onChange={(e) => setStartHour(e.target.value)}
                      className="w-12 h-10 border border-blue-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="font-bold">:</span>
                    <div className="w-12 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-700">
                      {startMin}
                    </div>
                  </div>
                </div>

                {/* End Time */}
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-2">End Time</label>
                  <div className="flex items-center gap-1 mb-2">
                     <div className="flex bg-gray-100 rounded p-0.5">
                        <button 
                          onClick={() => setEndMeridiem('AM')}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${endMeridiem === 'AM' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                        >AM</button>
                        <button 
                          onClick={() => setEndMeridiem('PM')}
                          className={`text-[10px] px-1.5 py-0.5 rounded ${endMeridiem === 'PM' ? 'bg-blue-600 text-white' : 'text-gray-500'}`}
                        >PM</button>
                     </div>
                  </div>
                  <div className="flex items-center gap-2">
                  <input
                      type="text"
                      value={endHour}
                      onChange={(e) => setEndHour(e.target.value)}
                      className="w-12 h-10 border border-blue-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    
                    <span className="font-bold">:</span>
                    <div className="w-12 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-700">
                      {endMin}
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center text-xs text-gray-500 mt-4 mb-8">
                Your session should be <span className="font-semibold text-gray-700">60 mins</span> long
              </div>

              <div className="flex gap-3 mt-auto">
                <button
                  onClick={handleSaveSlot}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelCreate}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* VIEW 3: List of Slots */}
          {view === 'list' && slots.length > 0 && (
            <div className="flex flex-col h-full">
              <div className="space-y-3 flex-1 overflow-y-auto">
                {slots.map((slot) => (
                  <div key={slot.id} className="bg-blue-600 text-white rounded-lg p-4 flex justify-between items-center shadow-sm">
                    <div className="font-semibold text-sm">
                      {slot.start} &rarr; {slot.end} <span className="opacity-75 font-normal ml-1">({slot.duration})</span>
                    </div>
                    <button 
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="text-white/80 hover:text-white"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                Your sessions for today are <span className="font-semibold text-gray-700">1 hr 30 mins</span> long
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotSchedulerModal;