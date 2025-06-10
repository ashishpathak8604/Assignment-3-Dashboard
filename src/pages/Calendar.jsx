import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const LOCAL_STORAGE_KEY = 'calendar-events';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [view, setView] = useState('month');
  const [searchTerm, setSearchTerm] = useState('');

  const formattedDate = date.toISOString().split('T')[0];
  const selectedEvents = events[formattedDate] || [];

  // Load events from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      setEvents(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(events));
  }, [events]);

  const handleAddEvent = () => {
    if (!newEvent.trim()) return;

    if (isEditing) {
      const updatedList = [...selectedEvents];
      updatedList[editIndex] = newEvent;
      setEvents({ ...events, [formattedDate]: updatedList });
    } else {
      setEvents({
        ...events,
        [formattedDate]: [...(events[formattedDate] || []), newEvent],
      });
    }

    setNewEvent('');
    setShowModal(false);
    setIsEditing(false);
  };

  const handleDeleteEvent = (index) => {
    const updated = selectedEvents.filter((_, i) => i !== index);
    setEvents({ ...events, [formattedDate]: updated });
  };

  const handleEditEvent = (index) => {
    setNewEvent(selectedEvents[index]);
    setEditIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  const filteredResults = Object.entries(events).flatMap(([date, items]) =>
    items
      .filter((event) =>
        event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm)
      )
      .map((event) => ({ date, event }))
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-6xl mx-auto mt-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📅 Calendar</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by event or date (YYYY-MM-DD)"
            className="border border-gray-300 rounded-md p-2 text-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="border border-gray-300 rounded-md p-2 text-sm"
            value={view}
            onChange={(e) => setView(e.target.value)}
          >
            <option value="month">📆 Month View</option>
            <option value="week">🗓️ Week View</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="rounded-lg overflow-hidden border border-gray-300 shadow-md">
          <Calendar
            onChange={setDate}
            value={date}
            view={view}
            onViewChange={({ activeStartDate, view }) => setView(view)}
            tileClassName={({ date }) => {
              const dateStr = date.toISOString().split('T')[0];
              return events[dateStr] ? 'bg-blue-100 text-blue-700 font-semibold' : '';
            }}
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">
              Events on {date.toDateString()}
            </h3>
            <button
              onClick={() => {
                setNewEvent('');
                setIsEditing(false);
                setShowModal(true);
              }}
              className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 text-sm"
            >
              + Add Event
            </button>
          </div>

          {selectedEvents.length > 0 ? (
            <ul className="space-y-2 text-gray-800">
              {selectedEvents.map((event, idx) => (
                <li key={idx} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                  <span>{event}</span>
                  <div className="flex gap-2">
                    <button
                      className="text-sm text-blue-600 hover:underline"
                      onClick={() => handleEditEvent(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-sm text-red-600 hover:underline"
                      onClick={() => handleDeleteEvent(idx)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No events for this date.</p>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchTerm && (
        <div className="mt-8">
          <h4 className="text-md font-semibold mb-2 text-gray-700">🔍 Search Results</h4>
          {filteredResults.length > 0 ? (
            <ul className="list-disc pl-5 space-y-1">
              {filteredResults.map((item, idx) => (
                <li key={idx} className="text-gray-700">
                  {item.event} on {item.date}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No matching events found.</p>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h4 className="text-lg font-semibold mb-4">
              {isEditing ? 'Edit Event' : 'Add Event'} on {date.toDateString()}
            </h4>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Event name"
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setIsEditing(false);
                }}
                className="px-4 py-1 border rounded-md text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isEditing ? 'Update' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
