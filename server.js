import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  // Setup transporter for Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // You can use another SMTP service
    auth: {
      user: "rohitsaundalkar322@gmail.com",
      pass: "hadp jszw gtlz ivrl", // Use App Password for Gmail
    },
  });

  const mailOptions = {
    from: email,
    to: "rohitsaundalkar322@gmail.com", // Your email where you want to receive messages
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
