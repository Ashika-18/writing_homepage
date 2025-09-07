require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { SMTPClient } = require("emailjs");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: "smtp.office365.com",
  ssl: false,
  tls: true,
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await client.sendAsync({
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "お問い合わせフォームからのメッセージ",
    });
    res.json({ success: true, message: "送信完了しました！" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "送信に失敗しました。" });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
