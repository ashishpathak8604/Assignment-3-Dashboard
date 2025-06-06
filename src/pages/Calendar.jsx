import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Required for core layout only

const sampleEvents = {
  '2025-06-10': ['Team Meeting'],
  '2025-06-15': ['Client Call', 'Project Deadline'],
  '2025-06-20': ['Deployment'],
};

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const formattedDate = date.toISOString().split('T')[0];
  const events = sampleEvents[formattedDate] || [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Calendar</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Calendar */}
        <div className="max-w-[350px] rounded-lg overflow-hidden shadow border border-gray-200">
          <Calendar
            onChange={setDate}
            value={date}
            tileClassName={({ date, view }) => {
              const dateStr = date.toISOString().split('T')[0];
              if (sampleEvents[dateStr]) {
                return 'bg-blue-50 text-blue-600 font-medium rounded-md';
              }
            }}
          />
        </div>

        {/* Events List */}
        <div className="flex-1">
          <h3 className="text-md font-medium mb-2">
            Events on {date.toDateString()}
          </h3>
          {events.length > 0 ? (
            <ul className="list-disc pl-4 space-y-1">
              {events.map((event, idx) => (
                <li key={idx} className="text-gray-700">{event}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No events for this date.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
