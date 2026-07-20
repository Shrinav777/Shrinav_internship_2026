const express = require("express");
const cors = require("cors");
require("dotenv").config();

require("./config/db");

const app = express();


app.use(cors({

    origin:"*"

}));


app.use(express.json());



// Routes

const cropRoutes =
require("./routes/cropRoutes");


app.use("/api/crop", cropRoutes);




// Render Port

const PORT = process.env.PORT || 5000;


app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});