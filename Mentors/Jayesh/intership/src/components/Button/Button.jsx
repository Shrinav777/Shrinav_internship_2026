import React from 'react'

export const Button = () => {

    const click = () =>{
        console.log("Button Clicked");
        
    }

    return (
        <>
            <button>Click</button>
            <button onClick={click}>Click Me</button>
        </>
    )
}
