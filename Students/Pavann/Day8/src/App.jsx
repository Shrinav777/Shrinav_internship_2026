import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([
    "Wake Up",
    "Drink Water",
    "Exercise",
    "Study React",
    "Go to College",
  ]);

  const [input, setInput] = useState("");

  const addTask = () => {
    if (input.trim() === "") {
      alert("Please enter a task");
      return;
    }

    setTasks([...tasks, input]);
    setInput("");
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <div className="input-area">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>

            <button
              className="delete-btn"
              onClick={() => removeTask(index)}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;