import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
/* index.js */
import { SMTPClient } from "emailjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイル配信
app.use(express.static(path.join(__dirname)));

// POST データを取得するため
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// メール送信用
const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASS,
  host: "smtp.office365.com",
  port: 587,
  tls: true,
});

// フォーム送信ルート
app.post("/send", (req, res) => {
  const { name, email, message } = req.body;

  client.send(
    {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `お問い合わせ: ${name}`,
      text: `名前: ${name}\nメール: ${email}\n内容:\n${message}`,
    },
    (err, msg) => {
      if (err) {
        console.error("送信エラー:", err);
        res.status(500).json({ success: false, error: err.message });
      } else {
        console.log("送信成功:", msg);
        res.json({ success: true });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
