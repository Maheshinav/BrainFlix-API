// require Express
const express = require ("express");
const app = express();

const cors = require("cors");

// read environment variables from .env
require("dotenv").config();
console.log(process.env);

// parse JSON in requests
app.use(express.json());

// serve static files
app.use(express.static("static"));

// enable CORS
app.use(cors());

// create some routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.post("/", (req, res) => {
  res.send("Received the data successfully!");
  
});

// import the route module
const videosRoutes = require("./routes/videos");

// "mount" the routes
app.use("/videos", videosRoutes);

// start the server
const port = process.env.PORT ?? 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
