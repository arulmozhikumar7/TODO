import React, { useState, useEffect, useRef } from "react";
import {
  getTasks,
  deleteTask,
  editTask,
  createTask,
} from "../services/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const titleRef = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, []); // Fetch tasks only once on initial render

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks(); // Fetch tasks again after deletion
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    try {
      const updatedTask = { ...task, status: newStatus };
      await editTask(task._id, updatedTask);
      fetchTasks(); // Fetch tasks again after status change
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDueDateChange = async (task, newDueDate) => {
    try {
      const updatedTask = { ...task, dueDate: newDueDate };
      await editTask(task._id, updatedTask);
      fetchTasks(); // Fetch tasks again after due date change
    } catch (error) {
      console.error("Error updating task due date:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      if (!formData.title || !formData.description || !formData.dueDate) {
        alert("Please fill all the fields");
        return;
      }
      await createTask(formData);
      fetchTasks(); // Fetch tasks again after adding a new task
      handleCloseModal(); // Close the modal
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-200";
      case "inprogress":
        return "bg-blue-200";
      case "completed":
        return "bg-green-200";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTaskClick = () => {
    setShowModal(true);
    setTimeout(() => {
      titleRef.current.focus();
    }, 100);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reset form data when closing modal
    setFormData({
      title: "",
      description: "",
      dueDate: "",
    });
  };

  return (
    <div className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Task List</h1>
      <button
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
        onClick={handleAddTaskClick}
      >
        Add Task
      </button>
      {showModal && (
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-500 bg-opacity-50">
          <div className="w-full max-w-sm p-6 bg-white rounded shadow-md">
            <div className="flex justify-between">
              <h2 className="text-2xl font-bold">Add Task</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <form className="mt-4" onSubmit={addTask}>
              <div className="mb-4">
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  ref={titleRef}
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </form>
          </div>
        </div>
      )}
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task._id}
            className={`p-4 rounded shadow-md flex items-center justify-between ${getStatusColor(
              task.status
            )}`}
          >
            <div className="flex-1">
              <span
                className={`block ${
                  task.status === "completed" ? "line-through" : ""
                }`}
              >
                {task.title} - {task.description} - Due:{" "}
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={task.status}
                onChange={(e) => handleStatusChange(task, e.target.value)}
                className="px-2 py-1 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="inprogress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              <input
                type="date"
                value={new Date(task.dueDate).toISOString().split("T")[0]}
                onChange={(e) => handleDueDateChange(task, e.target.value)}
                className="px-2 py-1 border rounded"
              />
              <button
                onClick={() => handleDelete(task._id)}
                className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
