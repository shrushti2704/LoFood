const cors = require('cors');
const express = require('express');
const mongoDB = require("./db");

const app = express();
const port = 5000;

// Connect to MongoDB
mongoDB();

// Use CORS to allow requests from React frontend
app.use(cors({
  origin: "'http://localhost:3000','http://localhost:3001'",
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
const orderDataRoute = require("./Routes/OrderData"); // Fixed this line

// Use Routes with Specific Paths
app.use('/api/createuser', createUserRoute);
app.use('/api/login', loginRoute);
app.use('/api/displaydata', displayRoute); 
app.use('/api/orderdata', orderDataRoute); // Updated route path

// Start Server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
