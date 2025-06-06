import React from "react";

// Example static tasks
const tasks = [
  { id: 1, title: "Design login page", status: "todo", assignee: "Sarah Johnson" },
  { id: 2, title: "Implement API", status: "inprogress", assignee: "Michael Chen" },
  { id: 3, title: "Write tests", status: "done", assignee: "Emily Davis" },
  { id: 4, title: "Update docs", status: "todo", assignee: "Priya Patel" },
  { id: 5, title: "Deploy to staging", status: "inprogress", assignee: "Carlos Ruiz" },
  { id: 6, title: "Code review", status: "done", assignee: "Anna Smith" },
];

const columns = [
  { id: "todo", title: "To Do", color: "border-blue-500" },
  { id: "inprogress", title: "In Progress", color: "border-yellow-500" },
  { id: "done", title: "Done", color: "border-green-500" },
];

const statusBadge = {
  todo: "bg-blue-100 text-blue-700",
  inprogress: "bg-yellow-100 text-yellow-700",
  done: "bg-green-100 text-green-700",
};

const Kanban = () => (
  <div className="p-6 bg-gray-50 min-h-screen">
    <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>
    <div className="flex gap-6">
      {columns.map((col) => (
        <div
          key={col.id}
          className={`bg-white rounded-lg p-4 w-1/3 min-h-[400px] border-t-4 ${col.color} shadow`}
        >
          <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
          {tasks
            .filter((task) => task.status === col.id)
            .map((task) => (
              <div
                key={task.id}
                className={`mb-4 p-4 bg-gray-50 rounded shadow-sm border-l-4 ${col.color} transition-all`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{task.title}</span>
                  <span className={`text-xs px-2 py-1 rounded ${statusBadge[task.status]}`}>
                    {col.title}
                  </span>
                </div>
                <div className="mt-2 text-sm text-gray-500">{task.assignee}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  </div>
);

export default Kanban;
