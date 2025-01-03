const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());
// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Path for the JSON file
const filePath = "add.json";

// Initialize the JSON file if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, JSON.stringify([]));
}

// Handle POST requests to /submit route
app.post("/submit", (req, res) => {
  const newData = req.body;

  if (!newData || Object.keys(newData).length === 0) {
    return res.status(400).send("No data received!");
  }

  try {
    // Read existing data
    let existingData = [];
    if (fs.existsSync(filePath)) {
      existingData = JSON.parse(fs.readFileSync(filePath, "utf8"));
    }

    // Add new data
    existingData.push(newData);

    // Save updated data to file
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.send("Thank you! Data saved successfully.");
  } catch (error) {
    res.status(500).send("Error saving data.");
  }
});

// Export handler for Vercel
module.exports = app;
