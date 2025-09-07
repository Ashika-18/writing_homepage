import express from "express";
import { SMTPClient } from "emailjs";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  const client = new SMTPClient({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: "smtp.office365.com",
    ssl: true,
  });

  try {
    await client.sendAsync({
      text: `From: ${name} <${email}>\n\n${message}`,
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "お問い合わせ",
    });
    res.send("メール送信成功");
  } catch (err) {
    console.error(err);
    res.status(500).send("送信失敗");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
