import "./App.css";
import { useState } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const addTodo = (newTodo) => {
    const todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
  };
  const deleteTodo = (id) => {
    const updatedtodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedtodos);
  };
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <>
      <div className="app">
        <div className="todo-container">
          <h1>Todo App</h1>
          <TodoForm addTodo={addTodo} />
          <TodoList
            todos={todos}
            deleteTodo={deleteTodo}
            toggleTodo={toggleTodo}
          />
        </div>
      </div>
    </>
  );
}

export default App;
