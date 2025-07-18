import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Allowed origins for CORS
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://my-portfolio-frontend-mocha.vercel.app" // Deployed frontend
];

console.log("hello")
console.log("hello")
console.log("hello")
console.log("hello")


// ✅ CORS Middleware (Fixed)
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Not allowed"));
    }
  },
  methods: ["POST", "GET", "OPTIONS"],
  credentials: true
}));
console.log("sheffsdcshcshdlhsd")

// ✅ Middleware to handle preflight OPTIONS requests
app.options("*", cors());

// ✅ Built-in JSON parser (no need for `body-parser`)
app.use(express.json());

// 📩 **Email Sending Endpoint**
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  // ✅ Nodemailer Transporter (Use Environment Variables)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Use .env file
      pass: process.env.EMAIL_PASS, // Use .env file
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.RECEIVER_EMAIL, // Use .env file for security
    subject: `New message from ${name}`,
    text: `You have received a new message from ${email}:\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ message: "Failed to send email", error: error.message });
  }
});

// 🚀 Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
