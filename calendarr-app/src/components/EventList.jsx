import React, { useState } from 'react';
import dayjs from 'dayjs';

const EventList = ({ events, setEvents }) => {
  const [editId, setEditId] = useState(null);
  const [editedEvent, setEditedEvent] = useState({});
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', duration: '' });

  const handleEdit = (event) => {
    setEditId(event.id);
    setEditedEvent(event);
  };

  const handleUpdate = () => {
    setEvents(events.map(ev => ev.id === editId ? editedEvent : ev));
    setEditId(null);
  };

  const handleDelete = (id) => {
    setEvents(events.filter(ev => ev.id !== id));
  };

  const handleAdd = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) return;
    const id = Date.now();
    setEvents([...events, { id, ...newEvent }]);
    setNewEvent({ title: '', date: '', time: '', duration: '' });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-[#161824] rounded-xl p-4 text-white overflow-y-auto h-full event-panel">
      <h2 className="text-lg md:text-xl font-semibold text-cyan-300 border-b border-gray-600 pb-2 mb-4 text-center md:text-left">
        Upcoming Events
      </h2>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="bg-blue-500 text-white p-4 rounded-lg shadow-md text-sm md:text-base">
            {editId === event.id ? (
              <div className="grid gap-2">
                <input
                  className="w-full p-2 rounded bg-white text-black"
                  value={editedEvent.title}
                  onChange={(e) => setEditedEvent({ ...editedEvent, title: e.target.value })}
                />
                <input
                  className="w-full p-2 rounded bg-white text-black"
                  type="date"
                  value={editedEvent.date}
                  onChange={(e) => setEditedEvent({ ...editedEvent, date: e.target.value })}
                />
                <input
                  className="w-full p-2 rounded bg-white text-black"
                  type="time"
                  value={editedEvent.time}
                  onChange={(e) => setEditedEvent({ ...editedEvent, time: e.target.value })}
                />
                <input
                  className="w-full p-2 rounded bg-white text-black"
                  value={editedEvent.duration}
                  onChange={(e) => setEditedEvent({ ...editedEvent, duration: e.target.value })}
                />

                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded text-sm md:text-base"
                  onClick={handleUpdate}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <strong className="text-base md:text-lg">{event.title}</strong>
                <span>{dayjs(event.date).format('MMM D, YYYY')} – {event.time} ({event.duration})</span>
                <div className="mt-2 space-x-2">
                  <button
                    className="text-yellow-200 hover:text-yellow-400"
                    onClick={() => handleEdit(event)}
                  >
                    ✏️
                  </button>
                  <button
                    className="text-red-200 hover:text-red-400"
                    onClick={() => handleDelete(event.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-8 bg-[#2c2f4a] p-4 rounded-lg add-form">
        <h3 className="text-center text-cyan-300 text-lg mb-4">Add More Events</h3>
        <div className="grid gap-2">
          <input
            className="w-full p-2 rounded bg-white text-black"
            placeholder="Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-white text-black"
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-white text-black"
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <input
            className="w-full p-2 rounded bg-white text-black"
            placeholder="Duration (e.g. 1h, 30m)"
            value={newEvent.duration}
            onChange={(e) => setNewEvent({ ...newEvent, duration: e.target.value })}
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 rounded text-sm md:text-base"
            onClick={handleAdd}
          >
            Add Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventList;
