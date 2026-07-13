import React from 'react'
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {Home} from './Home'
import {About} from './About'



export const Routing = () => {
  return (
    <div>
        <BrowserRouter>
            <nav className='flex gap-1'>
                <Link to={"/"}>Home</Link>
                <Link to={"/about"}>About Us</Link>
            </nav>

            <Routes>
                <Route path='/' element={<Home/>} />
                <Route path='/about' element={<About/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}
