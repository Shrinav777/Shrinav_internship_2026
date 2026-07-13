
import React, { useState } from 'react'

export const ColorPicker = () => {

    const [color, setColor] = useState("#FFFFFF");

    function handleColor(event) {
        setColor(event.target.value)
        console.log(event);
        
    }

  return (
    <div>
        <h1>Color Picker</h1>
        <p>Color : {color}</p>
        <input type="color" name="" id="" onChange={handleColor} value={color}/>
    </div>
  )
}
