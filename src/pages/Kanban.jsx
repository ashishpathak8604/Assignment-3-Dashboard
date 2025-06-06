// src/pages/Kanban.jsx
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Initial Kanban data (all in one file)
const initialTasks = [
  { id: "1", title: "Design login page", status: "todo", assignee: "Sarah Johnson" },
  { id: "2", title: "Implement API", status: "inprogress", assignee: "Michael Chen" },
  { id: "3", title: "Write tests", status: "done", assignee: "Emily Davis" },
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

function Kanban() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = tasks.map((task) =>
      task.id === result.draggableId
        ? { ...task, status: result.destination.droppableId }
        : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6">
          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  className={`bg-white rounded-lg p-4 w-1/3 min-h-[500px] border-t-4 ${col.color} shadow`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
                  {tasks
                    .filter((task) => task.status === col.id)
                    .map((task, idx) => (
                      <Draggable key={task.id} draggableId={task.id} index={idx}>
                        {(provided, snapshot) => (
                          <div
                            className={`mb-4 p-4 bg-gray-50 rounded shadow-sm border-l-4 transition-all ${
                              col.color
                            } ${snapshot.isDragging ? "bg-blue-50" : ""}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{task.title}</span>
                              <span
                                className={`text-xs px-2 py-1 rounded ${statusBadge[task.status]}`}
                              >
                                {col.title}
                              </span>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              {task.assignee}
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kanban;
