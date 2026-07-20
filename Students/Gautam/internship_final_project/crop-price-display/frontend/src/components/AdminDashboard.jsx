import {useEffect,useState} from "react";

import API from "../services/api";

import "./AdminDashboard.css";

function AdminDashboard(){

const [crops,setCrops]=useState([]);

const [search,setSearch]=useState("");

const [cropName,setCropName]=useState("");

const [state,setState]=useState("");

const [market,setMarket]=useState("");

const [price,setPrice]=useState("");

const [editId,setEditId]=useState(null);

const stateMarkets={

Gujarat:[

"Ahmedabad",
"Rajkot",
"Surat",
"Vadodara"

],


Maharashtra:[

"Mumbai",
"Pune",
"Nashik",
"Nagpur"

],


Punjab:[

"Amritsar",
"Ludhiana",
"Patiala"

],


Rajasthan:[

"Jaipur",
"Kota",
"Udaipur"

]


};





const fetchCrops=async()=>{


try{


const response=
await API.get("/crop/all");


setCrops(response.data);


}


catch(error){

console.log(error);

}


};




useEffect(()=>{


fetchCrops();


},[]);





const saveCrop=async()=>{


try{


const data={

crop_name:cropName,

state:state,

market:market,

price:price

};




if(editId){


await API.put(

`/crop/update/${editId}`,

data

);


}

else{


await API.post(

"/crop/add",

data

);


}





setCropName("");

setState("");

setMarket("");

setPrice("");

setEditId(null);



fetchCrops();


}

catch(error){

console.log(error);

}


};






const deleteCrop=async(id)=>{


await API.delete(

`/crop/delete/${id}`

);


fetchCrops();


};



const editCrop=(crop)=>{


setCropName(crop.crop_name);

setState(crop.state);

setMarket(crop.market);

setPrice(crop.price);

setEditId(crop.id);


};



return(


<div className="admin">


<h1>
🌾 Crop Management Dashboard
</h1>



<div className="form-box">


<input

placeholder="Crop Name"

value={cropName}

onChange={(e)=>setCropName(e.target.value)}

 />


<select

value={state}

onChange={(e)=>{

setState(e.target.value);

setMarket("");

}}

>


<option value="">
Select State
</option>


{

Object.keys(stateMarkets).map((item)=>(

<option key={item}>

{item}

</option>

))

}


</select>



<select

value={market}

disabled={!state}

onChange={(e)=>setMarket(e.target.value)}

>


<option value="">
Select Market
</option>


{

state &&

stateMarkets[state].map((item)=>(

<option key={item}>

{item}

</option>

))

}


</select>


<input

type="number"

placeholder="Price"

value={price}

onChange={(e)=>setPrice(e.target.value)}

 />

<button onClick={saveCrop}>

{

editId ?

"Update Crop"

:

"Add Crop"

}

</button>



</div>


<input

className="search"

placeholder="Search Crop..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

 />


<table>


<thead>

<tr>

<th>
ID
</th>

<th>
Crop
</th>

<th>
State
</th>

<th>
Market
</th>

<th>
Price
</th>

<th>
Action
</th>

</tr>

</thead>



<tbody>


{

crops

.filter((crop)=>

crop.crop_name

.toLowerCase()

.includes(search.toLowerCase())

)

.map((crop)=>(


<tr key={crop.id}>


<td>{crop.id}</td>

<td>{crop.crop_name}</td>

<td>{crop.state}</td>

<td>{crop.market}</td>

<td>₹ {crop.price}</td>


<td>


<button

className="edit"

onClick={()=>editCrop(crop)}

>

Edit

</button>




<button

className="delete"

onClick={()=>deleteCrop(crop.id)}

>

Delete

</button>


</td>


</tr>


))


}


</tbody>


</table>



</div>


);


}

export default AdminDashboard;