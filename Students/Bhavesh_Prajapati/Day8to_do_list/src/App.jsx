import { useState } from "react";

function App() {

  const [task, setTask] = useState([]);
  const [text, setText] = useState("");

  const addTask = () => {
    if (text === "") return;

    setTask([...task, text]);
    setText("");
  };

  const deleteTask = (index) => {
    setTask(task.filter((item, i) => i !== index));
  };

  return (
    <div>
      <h1>Todo App</h1>

      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {task.map((t, index) => (
          <li key={index}>
            {t}
            <button onClick={() => deleteTask(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;