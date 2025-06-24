import React, { useState } from 'react';
import EventList from './components/EventList';
import Calendar from './components/Calendar';
import './components/Calendar.css'; // Custom styling & animations

function App() {
  const [events, setEvents] = useState([]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-purple-900 to-blue-900 flex justify-center items-center animation-background">
      {/* Enlarged full-screen container */}
      <div className="flex gap-8 w-[95%] h-[95vh] p-8 rounded-2xl shadow-2xl bg-black/40 backdrop-blur-md container overflow-hidden">

        {/* ⬅️ Left Side: Event List – occupies more width */}
        <div className="flex-[1.8] h-full overflow-hidden">
          <EventList events={events} setEvents={setEvents} />
        </div>

        {/* ➡️ Right Side: Calendar – slightly less width */}
        <div className="flex-[1.3] h-full overflow-hidden">
          <Calendar events={events} />
        </div>

      </div>
    </div>
  );
}

export default App;
