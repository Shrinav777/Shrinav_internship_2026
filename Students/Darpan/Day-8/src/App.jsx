import { useState } from "react";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([
    "Wake Up",
    "Drink Water",
    "Exercise",
    "Study React",
    "Go to College"
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
    const updatedTasks = tasks.filter((item, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="container">

      <h1>My Todo List</h1>

      <div className="input-area">

        <input
          type="text"
          placeholder="Enter Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={addTask}>
          Add
        </button>

      </div>

      <ul>

        {tasks.map((task, index) => (

          <li key={index}>

            {task}

            <button
              className="delete-btn"
              onClick={() => removeTask(index)}
            >
              Delete
            </button>

          </li>

        ))}

      </ul>

    </div>
  );
}

export default App;