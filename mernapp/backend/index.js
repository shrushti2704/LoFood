const cors = require('cors');
const express = require('express');
const mongoDB = require("./db");

const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Use CORS to allow requests from React frontend
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json()); 

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
const createUserRoute = require("./Routes/CreatUser");
const loginRoute = require("./Routes/Login");
const displayRoute = require("./Routes/DisplayData");

app.use('/api', createUserRoute); // No changes here
app.use('/api', loginRoute); // This is correct, no need to add /loginuser
app.use('/api', displayRoute); 

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
