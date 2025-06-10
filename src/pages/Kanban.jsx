import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const LOCAL_STORAGE_KEY = 'kanban-tasks';

const initialColumns = [
  { id: 'todo', title: 'To Do', color: 'border-blue-500' },
  { id: 'inprogress', title: 'In Progress', color: 'border-yellow-500' },
  { id: 'done', title: 'Done', color: 'border-green-500' },
];

const statusBadge = {
  todo: 'bg-blue-100 text-blue-700',
  inprogress: 'bg-yellow-100 text-yellow-700',
  done: 'bg-green-100 text-green-700',
};

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignee: '', status: 'todo' });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) return;
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: '', assignee: '', status: 'todo' });
    setShowModal(false);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedTasks = [...tasks];
    const dragged = updatedTasks.find((t) => t.id.toString() === result.draggableId);
    dragged.status = result.destination.droppableId;
    setTasks(updatedTasks);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Kanban Board</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-6">
          {initialColumns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`bg-white rounded-lg p-4 w-1/3 min-h-[500px] border-t-4 ${col.color} shadow`}
                >
                  <h3 className="font-semibold text-lg mb-4">{col.title}</h3>
                  {tasks
                    .filter((task) => task.status === col.id)
                    .map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-4 p-4 bg-gray-50 rounded shadow-sm border-l-4 ${col.color}`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{task.title}</span>
                              <span
                                className={`text-xs px-2 py-1 rounded ${statusBadge[task.status]}`}
                              >
                                {col.title}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500">{task.assignee}</div>
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Task</h3>
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded mb-3"
              placeholder="Assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded mb-4"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 border rounded text-gray-600 hover:bg-gray-100"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={addTask}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;
