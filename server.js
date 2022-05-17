const express = require("express"); // import express so we can use express features
const cors = require("cors") //import cors to make Cross-Origin-Research-Sharing requests

const app = express(); //create our app varible which is an instance of express
app.use(cors()) // Cross Origin Resource Sharing...
const port = 8000; //declare the port

//NEED THIS TO HANDLE POST REQUESTS. HAVE THESE TWO LINES BEFORE THE ROUTES!!!
app.use(express.json()); //lets our app convert form info into json
app.use(express.urlencoded({extended:true})); //lets our app parse the form information

//import mongoose config file
require("./server/config/mongoose.config");

// //import routes at the end
require("./server/routes/product.routes")(app); 

// Always have this as the closing line on the server
app.listen( port, () => console.log(`Listening on port: ${port}`) );
