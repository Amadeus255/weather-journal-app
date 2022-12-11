// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 3600;
app.listen(port, () => {
    console.log(`running on localhost: ${port}`);
});

//creating a GET route that returns the projectData object in the server code
app.get("/all", (req, res) => {
    console.log(projectData);
    res.send(projectData);
});

//creating a POST route that adds incoming data to projectData
app.post("/add", (req, res) => {
    console.log(req.body);
    projectData = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse,
    };
    res.send(projectData);
});
