import { useState } from "react";
import "./App.css";

function App() {

  const [task, setTask] = useState([
    "Wake Up",
    "Brush Teeth",
    "Exercise",
    "Take Bath",
    "Breakfast",
    "Go to College"
  ]);

  const [newTask, setNewTask] = useState("");

  function AddTask() {
    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }

    setTask([...task, newTask]);
    setNewTask("");
  }

  function deleteTask(index) {
    setTask(task.filter((t, i) => i !== index));
  }

  return (
    <div className="container">

      <h1>Todo List</h1>

      <input
        type="text"
        placeholder="Enter Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button onClick={AddTask}>
        Add Task
      </button>

      <ul>
        {task.map((t, i) => (
          <li key={i}>
            {t}
            <button onClick={() => deleteTask(i)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;