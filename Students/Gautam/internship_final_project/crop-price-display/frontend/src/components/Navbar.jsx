import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar(){

return(

<nav className="navbar">


<div className="logo">
🌾 CropPrice
</div>



<ul className="nav-links">


<li>
<Link to="/">
Home
</Link>
</li>


<li>
<Link to="/prices">
Crop Price
</Link>
</li>


<li>
<Link to="/features">
Features
</Link>
</li>


<li>
<Link to="/admin">
Admin Dashboard
</Link>
</li>


<li>
<a href="#">
Contact
</a>
</li>


</ul>


</nav>

);

}


export default Navbar;