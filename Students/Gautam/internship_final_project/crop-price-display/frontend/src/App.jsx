import "./App.css";

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CropPriceTable from "./components/CropPriceTable";
import Features from "./components/Features";
import Stats from "./components/Stats";
import About from "./components/About";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";


function Home(){

return(

<>

<Hero/>

<Stats/>

<About/>

</>

);

}



function App(){

return(

<>


<Navbar/>


<Routes>


<Route 
path="/" 
element={<Home/>}
/>


<Route

path="/prices"

element={<CropPriceTable/>}

/>



<Route

path="/features"

element={<Features/>}

/>



<Route

path="/admin"

element={<AdminDashboard/>}

/>


</Routes>


<Footer/>


</>

);

}


export default App;