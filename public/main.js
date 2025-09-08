// main.js
const form = document.getElementById("contactForm");

// EmailJS 初期化
emailjs.init("ByFt4jDu5sGL02O8C"); // ← EmailJSのPublic Keyをここに

form.addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs.sendForm("service_ad3k7fl", "ByFt4jDu5sGL02O8C", this).then(
    function () {
      alert("送信が完了しました！");
      form.reset();
    },
    function (error) {
      alert("送信に失敗しました: " + JSON.stringify(error));
      console.error("送信エラー:", error);
    }
  );
});
