import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Configure CORS to allow requests from your frontend
const allowedOrigins = [
  "https://my-portfolio-frontend-mocha.vercel.app", // Add your frontend URL here without trailing slash
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy: Not allowed"));
      }
    },
  })
);

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Setup transporter for Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rohitsaundalkar322@gmail.com",
      pass: "hadp jszw gtlz ivrl", // Use App Password for Gmail
    },
  });

  const mailOptions = {
    from: email,
    to: "rohitsaundalkar322@gmail.com",
    subject: `New message from ${name}`,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send email", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


