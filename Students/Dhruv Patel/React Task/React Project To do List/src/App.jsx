import { useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState([
    "Wake Up",
    "Drink Water",
    "Gym",
    "Take Bath",
    "Breakfast",
    "Go to College",
    "Lunch",
    "Study",
    "Dinner",
    "Sleep",
  ]);

  const [newTask, setNewTask] = useState("");

  function addTask(event) {
    event.preventDefault();

    if (newTask.trim() === "") {
      alert("Please enter a task");
      return;
    }

    setTask((prevTasks) => [...prevTasks, newTask.trim()]);
    setNewTask("");
  }

  function deleteTask(index) {
    setTask((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  return (
    <div className="app-shell">
      <div className="todo-card">
        <div className="header">
          <div>
            <p className="eyebrow">Daily planner</p>
            <h1>Todo List</h1>
          </div>
          <span className="task-count">{task.length} tasks</span>
        </div>

        <p className="helper-text">Keep your day organized with a simple plan.</p>

        <form className="inputBox" onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <button type="submit">Add Task</button>
        </form>

        <ul className="task-list">
          {task.length === 0 ? (
            <li className="empty-state">No tasks yet. Add your first one above.</li>
          ) : (
            task.map((t, i) => (
              <li key={`${t}-${i}`} className="task-item">
                <span className="task-text">{t}</span>
                <button className="delete-btn" onClick={() => deleteTask(i)}>
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;