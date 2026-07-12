import React, { useState } from 'react';
import './App.css';

function App() {

  let [todolist, setToDOList] = useState([]);

  let saveToDoList = (event) => {
    event.preventDefault();

    let toname = event.target.toname.value.trim();

    if (toname === "") return;

    if (!todolist.includes(toname)) {
      let finalDoList = [...todolist, toname];
      setToDOList(finalDoList);
      event.target.toname.value = "";
    } else {
      alert("ToDo Name Already Exits.");
    }
  };

  let list = todolist.map((value, index) => {
    return (
      <ToDoListItems
        key={index}
        value={value}
        indexNumber={index}
        todolist={todolist}
        setToDOList={setToDOList}
      />
    );
  });

  return (
    <div className="App">
      <h1>ToDo List</h1>

      <form onSubmit={saveToDoList}>
        <input type="text" name="toname" />
        <button>Save</button>
      </form>

      <div className="outerDiv">
        <ul>
          {list}
        </ul>
      </div>
    </div>
  );
}

function ToDoListItems(props) {

  let [status, setStatus] = useState(false);

  let deleteRow = () => {
    let finalData = props.todolist.filter(
      (v, i) => i !== props.indexNumber
    );
    props.setToDOList(finalData);
  };

  return (
    <li className={status ? "completetodo" : ""}>
      <span
        onClick={() => setStatus(!status)}
        style={{ position: "static", cursor: "pointer" }}
      >
        {props.value}
      </span>

      <span onClick={deleteRow}>
        &times;
      </span>
    </li>
  );
}

export default App;