import { NewComp } from './components/NewComp'
import { Button } from './components/Button/Button'
import { useState } from 'react'
import { List } from './components/List'
import {ColorPicker} from './components/ColorPicker'
import {New} from './components/New'
import {UseState} from './components/UseState'
import {Event} from './components/Event'
import {UseEffect} from './components/UseEffect'
import {UseRef} from './components/UseRef'
import {Routing} from './components/Routing'
import {ComponentA} from './components/PROPS/ComponentA'

function App() {

  const [count, setCount] = useState(0);
  const fruits = [{ key: 1, name: "Apple" }, { key: 2, name: "Banana" }, { key: 3, name: "Papaya" }, { key: 4, name: "Grapes" }]

  const vegetable = [{ key: 1, name: "Potato" }, { key: 2, name: "Onion" }, { key: 3, name: "Beet" }, { key: 4, name: "ABC" }]

  const name = [{ key: 1, name: "ABC" }, { key: 2, name: "XYZ" }, { key: 3, name: "PQR" }, { key: 4, name: "JKL" }]
  //let listItems = fruits.map(fruit => <li key={fruit.key}>{fruit.name}</li>)

  return (
    <>
      <ComponentA />
     </>
  )
}

export default App
