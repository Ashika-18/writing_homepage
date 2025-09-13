/* main.js */
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // ページリロード防止

  const data = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { Accept: "application/json" },
  })
    .then((response) => {
      if (response.ok) {
        msg.style.display = "block"; // メッセージを表示
        form.reset(); // フォームをリセット
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            alert(data["errors"].map((error) => error["message"]).join(", "));
          } else {
            alert("送信に失敗しました。");
          }
        });
      }
    })
    .catch((error) => {
      alert("送信に失敗しました: " + error);
    });
});
