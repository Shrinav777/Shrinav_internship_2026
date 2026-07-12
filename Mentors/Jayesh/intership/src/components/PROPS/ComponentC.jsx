import React, { useContext } from 'react'
import {UserName} from './ComponentA'

export const ComponentC = () => {

    const user = useContext(UserName); 
    
  return (
    <div className='bg-blue-300 font-black'>
        ComponentC <br /> {user}
    </div>
  )
}
