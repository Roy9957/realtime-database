const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 3000; // Hardcoded port 3000

// Enable CORS
app.use(cors());

// Middleware to parse JSON data
app.use(express.json()); // Use express.json() for JSON body parsing

// In-memory storage for submitted data
let submissions = [];

// Handle GET requests to / route to show all submissions
app.get("/", (req, res) => {
  res.json({ submissions });
});

// Handle GET requests to /x_submit route to submit name, email, and age
app.get("/x_submit", (req, res) => {
  const { name, email, age } = req.query;

  if (!name || !email || !age) {
    return res.status(400).send("Missing required fields: name, email, age");
  }

  try {
    // Add new data to in-memory storage
    submissions.push({ name, email, age });

    res.send("Data saved successfully.");
  } catch (error) {
    res.status(500).send("Error saving data.");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
