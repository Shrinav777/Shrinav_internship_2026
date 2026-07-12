import { useEffect, useState } from "react"


export const UseEffect = () => {

    const [count, setCount] = useState(0)
    const [sec, setSec] = useState(0)

    useEffect(() => { 
        document.title = `Press button for counter`
        console.log('First render')
    },[count])

    useEffect(() => { 
        document.title = `Press button for counter`
        console.log('second render')
    }, [sec])

    const Increament = () =>{
        setCount(count + 1)
    }

    const IncreamentSec = () => {
        setSec(sec + 1)
    }

    return (
        <div>
            <button onClick={Increament} className="bg-black text-white p-3 m-2">Inc</button>
            <button onClick={IncreamentSec} className="bg-black text-white p-3">Inc Sec</button>
            <p>Count: {count}
                &nbsp; Second Count:  {sec}
            </p>
        </div>
    )
}
