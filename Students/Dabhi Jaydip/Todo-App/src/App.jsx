import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State management to load saved entries dynamically from browser storage
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('day8_todo_database');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  
  const [inputValue, setInputValue] = useState('');

  // Synchronize tasks state database array into local memory securely
  useEffect(() => {
    localStorage.setItem('day8_todo_database', JSON.stringify(tasks));
  }, [tasks]);

  // Handler execution code properties to process input context strings safely
  const handleAddTask = () => {
    if (inputValue.trim() === '') {
      alert('The task configuration field text input cannot be empty!');
      return;
    }
    const targetObj = {
      id: Date.now(),
      text: inputValue.trim(),
      completed: false
    };
    setTasks([...tasks, targetObj]);
    setInputValue(''); // Reset text box context properties parameters to empty
  };

  // Handler process system to drop single node instances matching tracking keys
  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(item => item.id !== id));
  };

  // Modifier state conditionally setting flags dynamically on component trigger mapping
  const handleToggleComplete = (id) => {
    setTasks(tasks.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  return (
    <div className="todo-app-root">
      <div className="todo-main-wrapper">
        <h2>Day 8: React Todo List</h2>
        
        {/* Functional components text input wrapper mapping panel */}
        <div className="task-form-controls">
          <input 
            type="text" 
            placeholder="Type your objective text context here..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        {/* Display nodes structural list arrays */}
        <ul className="task-render-block">
          {tasks.map((item) => (
            <li key={item.id} className={item.completed ? 'task-checked' : ''}>
              <span className="task-content-label" onClick={() => handleToggleComplete(item.id)}>
                {item.text}
              </span>
              <button className="task-delete-trigger" onClick={() => handleDeleteTask(item.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
