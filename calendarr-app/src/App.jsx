import React, { useState } from 'react';
import EventList from './components/EventList';
import Calendar from './components/Calendar';
import './components/Calendar.css'; // Optional: For custom CSS styling/animations

function App() {
  // 🔧 State to manage all events
  const [events, setEvents] = useState([]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 to-blue-900 flex justify-center items-center animation-background">
      {/* 📦 Main Responsive Container */}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-7xl h-[95vh] p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl bg-black/40 backdrop-blur-md container overflow-hidden">

        {/* ⬅️ Left: Event List (takes more width on larger screens) */}
        <div className="w-full lg:flex-[1.8] h-full overflow-hidden">
          <EventList events={events} setEvents={setEvents} />
        </div>

        {/* ➡️ Right: Calendar (slightly less width) */}
        <div className="w-full lg:flex-[1.3] h-full overflow-hidden">
          <Calendar events={events} />
        </div>

      </div>
    </div>
  );
}

export default App;
