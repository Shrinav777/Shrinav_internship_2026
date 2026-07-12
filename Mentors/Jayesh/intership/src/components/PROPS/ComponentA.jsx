import React, { createContext, useState } from 'react'
import {ComponentB} from './ComponentB'


export const UserName = createContext();

export const ComponentA = () => {

    const [uname, setUname] = useState("Jayesh");
  return (

    <div className='bg-red-200'>
        <p>Component A</p>
        <UserName.Provider value={uname}>
            <ComponentB />
        </UserName.Provider>
    </div>

    
  )
}
