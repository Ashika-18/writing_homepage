/* server.js */
// server.js

import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import { SMTPClient } from "emailjs";
import dotenv from "dotenv";

// .env 読み込み
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイル配信
app.use(express.static(path.join(__dirname)));

// POST データを取得
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Office365 SMTP クライアント
const client = new SMTPClient({
  user: process.env.EMAIL_USER, // .env に設定
  password: process.env.EMAIL_PASS, // .env に設定
  host: "smtp.office365.com",
  port: 587,
  ssl: false, // TLS を使用
  tls: { ciphers: "SSLv3" },
});

// メール送信ルート
app.post("/send", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "全ての項目を入力してください" });
    }

    // メール送信
    client.send(
      {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // 送信先（自分宛）
        subject: `お問い合わせ: ${name}`,
        text: `名前: ${name}\nメール: ${email}\n内容:\n${message}`,
      },
      (err, msg) => {
        if (err) {
          console.error("送信エラー:", err);
          return res.status(500).json({ success: false, error: err.message });
        }
        console.log("送信成功:", msg);
        return res.json({ success: true });
      }
    );
  } catch (err) {
    console.error("予期せぬエラー:", err);
    return res
      .status(500)
      .json({ success: false, error: "サーバーエラーが発生しました" });
  }
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
