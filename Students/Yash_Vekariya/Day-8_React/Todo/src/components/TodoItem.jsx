const TodoItem = ({ todo, deleteTodo, toggleTodo }) => {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />

      <span className={todo.completed ? "completed" : ""}>{todo.text}</span>

      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
