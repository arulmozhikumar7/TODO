// src/App.js
import React, { useState } from "react";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasksChanged, setTasksChanged] = useState(false);

  const handleTaskAdded = () => {
    setTasksChanged(!tasksChanged);
  };

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <div className="container mx-auto">
        <h1 className="mb-6 text-4xl font-bold text-center">
          To-Do Application
        </h1>

        <TaskList key={tasksChanged} />
      </div>
    </div>
  );
};

export default App;
