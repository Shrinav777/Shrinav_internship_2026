import React, { useState } from 'react'

export const Event = () => {

    const [name, setName] = useState('')

  return (
    <div className='bg-blue-500 m-1'>
        <input 
        type="text"
        value={name}
        onChange={(e)=>{
            setName(e.target.value)
        }}
        placeholder='Enter your name'
        />
        Name: {name === '' ? 'Enter your name' : name}
    </div>
  )
}
