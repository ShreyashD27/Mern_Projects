const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const favicon = require('serve-favicon');
const path = require('path');
require("dotenv").config();

const app = express();

const corsOptions = {
  origin:'https://authentication-vercel-frontend.vercel.app',// Allow the frontend domain
  methods: 'GET,POST,PUT,DELETE,OPTIONS', // Allowed methods
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Connect to MongoDB
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://shreyash:12341234@cluster0.pg5tv.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your actual MongoDB URI
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

  app.get("/",(req, res)=>{
    res.json("Hello");
  })
// Routes
const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
