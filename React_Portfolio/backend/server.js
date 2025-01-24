const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "Gmail", // Replace this with the email service you are using (e.g., Yahoo, Outlook)
  auth: {
    user: process.env.EMAIL_USER, // Fetch email from environment variables
    pass: process.env.EMAIL_PASS, // Fetch email password from environment variables
  },
});


// Endpoint to handle contact form submission
app.post("/api/contact", async (req, res) => {
  const { name, email, query } = req.body;

  const mailOptions = {
    from: email, // Sender's email
    to: "shreyashdivekar.numetry@gmail.com", // Your email
    subject: `New Contact Form Submission from ${name}`,
    text: `You have received a new query:\n\nName: ${name}\nEmail: ${email}\nQuery: ${query}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
