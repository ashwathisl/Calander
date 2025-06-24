import React, { useState } from 'react';
import dayjs from 'dayjs';

const Calendar = ({ events }) => {
  const current = dayjs();
  const [month, setMonth] = useState(current.month());
  const [year, setYear] = useState(current.year());

  const daysInMonth = dayjs(new Date(year, month)).daysInMonth();
  const startDay = dayjs(new Date(year, month, 1)).day();

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 50 }, (_, i) => 2000 + i);

  const handleMonthChange = (e) => setMonth(parseInt(e.target.value));
  const handleYearChange = (e) => setYear(parseInt(e.target.value));

  const renderCells = () => {
    const totalCells = daysInMonth + startDay;
    const cells = [];

    for (let i = 0; i < totalCells; i++) {
      const day = i - startDay + 1;
      const isToday = current.date() === day && current.month() === month && current.year() === year;
      const dateStr = dayjs(new Date(year, month, day)).format("YYYY-MM-DD");
      const eventsForDay = events.filter(ev => ev.date === dateStr);

      let className = "p-2 rounded-lg text-center transition duration-200 ease-in-out";

      if (day > 0) {
        if (isToday) {
          className += " today bg-orange-500 text-white font-bold rounded-full";
        } else if (eventsForDay.length > 0) {
          className += " event-day bg-gradient-to-br from-cyan-400 to-green-500 text-white font-bold animate-pulse rounded-full shadow-md";
        } else {
          className += " bg-gray-800 hover:bg-cyan-400 cursor-pointer";
        }
      }

      cells.push(
        <td key={i} className={className}>
          {day > 0 && (
            <div>
              <span>{day}</span>
              {eventsForDay.map((ev, idx) => (
                <div
                  key={idx}
                  className="text-xs mt-1 text-cyan-100 max-h-[40px] overflow-y-auto"
                >
                  {ev.title}<br />
                  {ev.time} ({ev.duration})
                </div>
              ))}
            </div>
          )}
        </td>
      );
    }

    return cells;
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(prev => prev - 1);
    } else {
      setMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(prev => prev + 1);
    } else {
      setMonth(prev => prev + 1);
    }
  };

  return (
    <div className="flex-1 bg-[#1e1e2f] rounded-xl p-4 text-white flex flex-col h-full calendar-panel">
      <div className="text-2xl font-bold mb-4 calendar-title">Calendar</div>

      <div className="flex justify-between items-center bg-[#2c2f4a] px-4 py-2 rounded-md mb-4 calendar-header">
        <button onClick={handlePrevMonth} className="bg-indigo-600 px-2 py-1 text-white rounded">◀</button>
        <select value={month} onChange={handleMonthChange} className="bg-indigo-600 text-white px-2 py-1 rounded">
          {months.map((m, idx) => (
            <option value={idx} key={idx}>{m}</option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange} className="bg-indigo-600 text-white px-2 py-1 rounded">
          {years.map((y) => (
            <option value={y} key={y}>{y}</option>
          ))}
        </select>
        <button onClick={handleNextMonth} className="bg-indigo-600 px-2 py-1 text-white rounded">▶</button>
      </div>

      <div className="flex-1 overflow-y-auto calendar-wrapper">
        <table className="w-full table-fixed text-center text-sm calendar">
          <thead>
            <tr className="bg-indigo-800 text-gray-200">
              <th className="p-2">Sun</th>
              <th className="p-2">Mon</th>
              <th className="p-2">Tue</th>
              <th className="p-2">Wed</th>
              <th className="p-2">Thu</th>
              <th className="p-2">Fri</th>
              <th className="p-2">Sat</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(Math.ceil((daysInMonth + startDay) / 7))].map((_, rowIndex) => (
              <tr key={rowIndex}>
                {renderCells().slice(rowIndex * 7, rowIndex * 7 + 7)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;
