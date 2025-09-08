// フォーム取得
const form = document.getElementById("contactForm");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // ページリロード防止

  // EmailJS 送信
  emailjs.sendForm("service_48qdz9d", "template_vtde22k", this).then(
    function () {
      alert("送信が完了しました！");
      form.reset(); // フォームをリセット
    },
    function (error) {
      alert("送信に失敗しました…\n" + JSON.stringify(error));
      console.error("送信エラー:", error);
    }
  );
});
