import React, { useRef } from 'react'

export const UseRef = () => {

    const abc = useRef(null);


    const FocusInput = (e) =>{
        abc.current.focus()
        console.log(abc);
        console.log(e);
        
        
    }

  return (
    <div>
        <input type="text" placeholder='Enter your name' className='border-1' ref={abc}/>
        <button onClick={FocusInput} className='border-1 mx-2'>Focus</button>
    </div>
  )
}
