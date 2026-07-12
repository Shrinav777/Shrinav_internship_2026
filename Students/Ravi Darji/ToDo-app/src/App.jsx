import { useState } from "react";
import "./App.css";

function App() {
  let task = [
    { index: 1, task: "Wake Up" },
    { index: 2, task: "Take Bath" },
    { index: 3, task: "Brush Teeth" },
  ];

  const [tasks, setTask] = useState(task);

  const handleOnClick = (e) => {
    e.preventDefault();
    let taskInput = document.querySelector("input[name=task]").value;
    if (taskInput) {
      let newTask = { index: tasks.length + 1, task: taskInput };
      setTask((prevTasks) => [...prevTasks, newTask]);
      document.querySelector("input[name=task]").value = "";
    }
  };

  const handleOnDelete = (e) => {
    e.preventDefault();
    let taskToDelete = e.target.parentElement.firstChild.textContent;
    setTask((prevTasks) =>
      prevTasks.filter((task) => task.task !== taskToDelete),
    );
  };

  return (
    <>
      <h1>Todo App</h1>
      <br />
      <br />
      <p>
        Enter Your Task : <input type="text" name="task" /> &nbsp;
        <button onClick={handleOnClick}>Add Task</button>
      </p>
      <br />
      <ul>
        {tasks.map((task) => (
          <li key={task.index}>
            {task.task} <button onClick={handleOnDelete}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
