import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todos() {
  let [todos, setTodos] = useState([
    { task: "sample todo", id: uuidv4(), isDone: false },
  ]);
  let [newTodo, setNewTodo] = useState("");

  let updateTodo = () => {
    setTodos((prevalue) => {
      return [...prevalue, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };
  let updateNewTodo = (event) => {
    setNewTodo(event.target.value);
  };
  let deleteTodo = (id) => {
    // let copy = todos.filter((todo) => todo.id != id);
    // console.log(copy);
    setTodos((prevalue) => {
      return prevalue.filter((todo) => todo.id != id);
    });
  };

  let uppercaseAll = () => {
    let newArr = todos.map((todo) => {
      return {
        ...todo,
        task: todo.task.toUpperCase(),
      };
    });
    console.log(newArr);
    setTodos(newArr);
  };
  let lowercaseAll = () => {
    let newArr = todos.map((todo) => {
      return {
        ...todo,
        task: todo.task.toLowerCase(),
      };
    });
    console.log(newArr);
    setTodos(newArr);
  };

  let uppercase = (id) => {
    let newArr = todos.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      } else {
        return {
          ...todo,
        };
      }
    });
    console.log(newArr);
    setTodos(newArr);
  };

  let markDone = (id) => {
    let newArr = todos.map((todo) => {
      if (todo.id == id) {
        return {
          ...todo,
          isDone: true,
        };
      } else {
        return {
          ...todo,
        };
      }
    });
    console.log(newArr);
    setTodos(newArr);
  };
  return (
    <div>
      <h3>......TODOS......</h3>
      <input
        type="text"
        placeholder="add a task"
        value={newTodo}
        onChange={updateNewTodo}
      />
      <button onClick={updateTodo}>add</button>

      <p>Todo lists :</p>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.isDone ? (
              <span style={{ textDecoration: "line-through" }}>
                {todo.task}
              </span>
            ) : (
              <span>{todo.task}</span>
            )}
            &nbsp;&nbsp;&nbsp;
            <span>
              <button
                onClick={() => {
                  uppercase(todo.id);
                }}
              >
                upeer case
              </button>
              &nbsp;&nbsp;
            </span>
            <span>
              <button
                onClick={() => {
                  markDone(todo.id);
                }}
              >
                mark as done
              </button>
              &nbsp;&nbsp;
            </span>
            <span>
              <button
                onClick={() => {
                  deleteTodo(todo.id);
                }}
              >
                delete
              </button>
            </span>
          </li>
        ))}
        <button onClick={uppercaseAll}>uppercse all</button>
        <button onClick={lowercaseAll}>lowercase all</button>
      </ul>
    </div>
  );
}
