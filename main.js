// main.js

// フォーム取得
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // ページリロード防止

  // フォームの値を取得
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  try {
    // サーバーに POST 送信
    const res = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    // JSON でレスポンス取得
    const result = await res.json();

    if (result.success) {
      alert("送信成功しました！");
      form.reset(); // フォームをリセット
    } else {
      alert("送信に失敗しました: " + result.error);
    }
  } catch (err) {
    // ネットワークエラーや予期せぬエラー
    alert("通信エラーが発生しました: " + err.message);
    console.error("通信エラー:", err);
  }
});
