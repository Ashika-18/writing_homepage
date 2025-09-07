// main.js

const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.querySelector('input[type="text"]').value,
    email: form.querySelector('input[type="email"]').value,
    message: form.querySelector("textarea").value,
  };

  const res = await fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  if (result.success) {
    alert("送信成功しました！");
    form.reset();
  } else {
    alert("送信に失敗しました: " + result.error);
  }
});
