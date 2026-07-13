import React, { useState } from 'react'

export const New = () => {

    const [task, setTask] = useState(["DO Workk","GO OUtside"])
    
    function AddTask(){
        setTask(t => [...t , "Add Task"])
    }

    function deleteTask(index){
        setTask(task.filter((t , i)=> i !== index))
    }


  return (
    <ul>
        {task.map((m,i) => <li onClick={() => deleteTask(i)} >{m} :<button>Delete</button> </li>)}
        <button onClick={AddTask}>Add</button>        
    </ul>
  )
}
