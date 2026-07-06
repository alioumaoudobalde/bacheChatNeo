const backButton = document.querySelector("[data-back]");

if (backButton) {
  backButton.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.href = "dashboard.html";
  });
}
