const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Hardcoded port 3000

// Enable CORS
app.use(cors());

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add this line to parse JSON body

// In-memory storage for messages
let messages = [];

// Handle POST requests to /submit route
app.post("/submit", (req, res) => {
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).send("No data received!");
  }

  try {
    // Add new data to in-memory storage
    messages.push(newData);

    res.send("Thank you! Data saved successfully.");
  } catch (error) {
    res.status(500).send("Error saving data.");
  }
});

// Endpoint to fetch messages
app.get("/getMessages", (req, res) => {
  res.json({ messages });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
