import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

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
    to: "rohitsaundalkar322@gmail.com", // Your email where you want to receive messages
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


