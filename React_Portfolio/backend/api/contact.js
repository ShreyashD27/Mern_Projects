const nodemailer = require("nodemailer");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, query } = req.body;

  const transporter = nodemailer.createTransport({
    service: "Gmail", // Replace this with the email service you are using
    auth: {
      user: process.env.EMAIL_USER, // Environment variable for email
      pass: process.env.EMAIL_PASS, // Environment variable for password
    },
  });

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
}
