import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const LOCAL_STORAGE_KEY = 'kanban-tasks';

const initialColumns = [
  { id: 'todo', title: 'To Do', color: 'border-blue-500' },
  { id: 'inprogress', title: 'In Progress', color: 'border-yellow-500' },
  { id: 'done', title: 'Done', color: 'border-green-500' },
];

const statusBadge = {
  todo: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200',
  inprogress: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200',
  done: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200',
};

const Kanban = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', assignee: '', status: 'todo' });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTasks(JSON.parse(saved));
  }, []);

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
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Kanban Board</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
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
                  className={`rounded-lg p-4 w-1/3 min-h-[500px] border-t-4 ${col.color} shadow bg-white dark:bg-gray-800 transition-colors`}
                >
                  <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-white">
                    {col.title}
                  </h3>
                  {tasks
                    .filter((task) => task.status === col.id)
                    .map((task, index) => (
                      <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`mb-4 p-4 rounded shadow-sm border-l-4 ${col.color} bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{task.title}</span>
                              <span
                                className={`text-xs px-2 py-1 rounded ${statusBadge[task.status]}`}
                              >
                                {col.title}
                              </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
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

      {showModal && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg text-gray-800 dark:text-white">
            <h3 className="text-lg font-bold mb-4">Add New Task</h3>
            <input
              className="w-full p-2 border rounded mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            />
            <input
              className="w-full p-2 border rounded mb-3 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              placeholder="Assignee"
              value={newTask.assignee}
              onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
            />
            <select
              className="w-full p-2 border rounded mb-4 dark:bg-gray-700 dark:text-white dark:border-gray-600"
              value={newTask.status}
              onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-1 border rounded text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
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
