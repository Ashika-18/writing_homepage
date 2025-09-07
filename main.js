const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: form.elements[0].value,
    email: form.elements[1].value,
    message: form.elements[2].value,
  };

  try {
    const res = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    alert(result.message);
    form.reset();
  } catch (err) {
    console.error(err);
    alert("送信に失敗しました。");
  }
});
