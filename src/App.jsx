// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import Dashboard from './pages/Dashboard/Dashboard';
import Tables from './pages/Tables';
import Charts from './pages/Charts';
import Calendar from './pages/Calendar';
import Kanban from './pages/Kanban';
import Settings from './pages/Settings';

import { ThemeProvider } from './context/ThemeContext'; // <-- Import ThemeProvider

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/kanban" element={<Kanban />} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
