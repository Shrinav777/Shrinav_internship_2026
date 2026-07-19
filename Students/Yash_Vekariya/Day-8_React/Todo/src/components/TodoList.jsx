import TodoItem from "./TodoItem";
function TodoList({ todos, deleteTodo, toggleTodo }) {
  return (
    <>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          deleteTodo={deleteTodo}
          toggleTodo={toggleTodo}
        />
      ))}
    </>
  );
}

export default TodoList;
