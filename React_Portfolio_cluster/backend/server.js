const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://shreyash:12341234@cluster0.pg5tv.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Define schema and model
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  query: String,
});

const Contact = mongoose.model("Contact", ContactSchema);

// API endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, query } = req.body;

  try {
    const newContact = new Contact({ name, email, query });
    await newContact.save();
    res.status(201).send("Query submitted successfully!");
  } catch (error) {
    console.error("Error saving query:", error);
    res.status(500).send("Failed to submit query.");
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
