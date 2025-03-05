import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000; // Use dynamic port for deployment

// Middleware
app.use(cors({
  origin: "https://my-portfolio-frontend-mocha.vercel.app", // Replace with your actual Vercel frontend URL
  methods: ["POST", "GET" , "OPTIONS"],
  credentials: true
}));
app.options("*", cors());
app.use(express.json()); // Parse JSON requests

// Email Sending Endpoint
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Setup transporter for Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rohitsaundalkar322@gmail.com",
      pass: "hadp jszw gtlz ivrl", // Replace with Gmail App Password
    },
  });

  // Email configuration
  const mailOptions = {
    from: email,
    to: "rohitsaundalkar322@gmail.com", // Your email to receive messages
    subject: `New message from ${name}`,
    text: `You have received a new message from ${email}:\n\n${message}`,
  };

  // Send the email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
